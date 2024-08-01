/**
 * 圆扩散
 */
import * as Cesium from 'cesium';

interface DiffuseOptions {
  scanColor?: string;
  maxRadius?: number;
  duration?: number;
}

export default class CircleDiffusion {
  viewer: any;
  lastStageList: any;
  constructor(viewer: any) {
    this.viewer = viewer;
    this.lastStageList = [];
  }

  add(position: any, options: DiffuseOptions = {}) {
    const { scanColor = '#FFFFFF', maxRadius, duration } = options;

    const stage = this.showCircleScan(position, scanColor, maxRadius, duration);
    this.lastStageList.push(stage);
    console.log(111, this.lastStageList);
  }

  clear() {
    this.lastStageList.forEach((el: any) => {
      this.clearScanEffects(el);
    });
    this.lastStageList = [];
  }

  /**
   * 显示圆形扫描效果。
   * @param {*} position 圆心位置，包含经度、纬度和高度信息。[117.270739， 31.84309， 32]
   * @param {String} scanColor 扫描颜色，使用CSS颜色字符串表示。如'#FFFF00'
   * @param {Number} maxRadius 最大半径。单位米 如1000m
   * @param {Number} duration 持续时间。单位毫秒 如4000
   * @returns 圆形扫描效果的最后一个阶段。
   */
  showCircleScan(
    position: any,
    scanColor: DiffuseOptions['scanColor'],
    maxRadius: DiffuseOptions['maxRadius'],
    duration: DiffuseOptions['duration'],
  ) {
    const cartographicCenter: any = new Cesium.Cartographic(
      Cesium.Math.toRadians(position[0]),
      Cesium.Math.toRadians(position[1]),
      position[2],
    );
    const color: any = Cesium.Color.fromCssColorString(scanColor);
    const lastStage = this._addCircleScanPostStage(cartographicCenter, maxRadius, color, duration);
    return lastStage;
  }

  _addCircleScanPostStage(
    cartographicCenter: any,
    maxRadius: DiffuseOptions['maxRadius'],
    scanColor: DiffuseOptions['scanColor'],
    duration: DiffuseOptions['duration'],
  ) {
    const _Cartesian3Center = Cesium.Cartographic.toCartesian(cartographicCenter);
    const _Cartesian4Center = new Cesium.Cartesian4(
      _Cartesian3Center.x,
      _Cartesian3Center.y,
      _Cartesian3Center.z,
      1.0,
    );
    const _CartographicCenter1 = new Cesium.Cartographic(
      cartographicCenter.longitude,
      cartographicCenter.latitude,
      cartographicCenter.height + 500,
    );
    const _Cartesian3Center1 = Cesium.Cartographic.toCartesian(_CartographicCenter1);
    const _Cartesian4Center1 = new Cesium.Cartesian4(
      _Cartesian3Center1.x,
      _Cartesian3Center1.y,
      _Cartesian3Center1.z,
      1.0,
    );
    const _time = new Date().getTime();
    const _scratchCartesian4Center = new Cesium.Cartesian4();
    const _scratchCartesian4Center1 = new Cesium.Cartesian4();
    const _scratchCartesian3Normal = new Cesium.Cartesian3();
    const _this = this;
    const ScanPostStage = new Cesium.PostProcessStage({
      fragmentShader: _this._getScanSegmentShader(),
      uniforms: {
        u_scanCenterEC: function () {
          const temp = Cesium.Matrix4.multiplyByVector(
            _this.viewer.camera._viewMatrix,
            _Cartesian4Center,
            _scratchCartesian4Center,
          );
          return temp;
        },
        u_scanPlaneNormalEC: function () {
          const temp = Cesium.Matrix4.multiplyByVector(
            _this.viewer.camera._viewMatrix,
            _Cartesian4Center,
            _scratchCartesian4Center,
          );
          const temp1 = Cesium.Matrix4.multiplyByVector(
            _this.viewer.camera._viewMatrix,
            _Cartesian4Center1,
            _scratchCartesian4Center1,
          );
          _scratchCartesian3Normal.x = temp1.x - temp.x;
          _scratchCartesian3Normal.y = temp1.y - temp.y;
          _scratchCartesian3Normal.z = temp1.z - temp.z;
          Cesium.Cartesian3.normalize(_scratchCartesian3Normal, _scratchCartesian3Normal);
          return _scratchCartesian3Normal;
        },
        u_radius: function () {
          return (maxRadius * ((new Date().getTime() - _time) % duration)) / duration;
        },
        u_scanColor: scanColor,
      },
    });
    this.viewer.scene.postProcessStages.add(ScanPostStage);
    return ScanPostStage;
  }
  /**
   * 扩散效果Shader
   */
  _getScanSegmentShader() {
    const inpram = 18;
    const scanSegmentShader =
      ` uniform sampler2D colorTexture;
        uniform sampler2D depthTexture;
        in vec2 v_textureCoordinates;
        uniform vec4 u_scanCenterEC;
        uniform vec3 u_scanPlaneNormalEC;
        uniform float u_radius;
        uniform vec4 u_scanColor;
        out vec4 fragColor;
        vec4 toEye(in vec2 uv, in float depth){
          vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));
          vec4 posInCamera = czm_inverseProjection * vec4(xy, depth, 1.0);
          posInCamera =posInCamera / posInCamera.w;
          return posInCamera;
        }
        vec3 pointProjectOnPlane(in vec3 planeNormal, in vec3 planeOrigin, in vec3 point){
            vec3 v01 = point - planeOrigin;
            float d = dot(planeNormal, v01) ;
            return (point - planeNormal * d);
        }
        float getDepth(in vec4 depth){
            float z_window = czm_unpackDepth(depth);
            z_window = czm_reverseLogDepth(z_window);
            float n_range = czm_depthRange.near;
            float f_range = czm_depthRange.far;
            return (2.0 * z_window - n_range - f_range) / (f_range - n_range);
        }
        void main(){
          fragColor = texture(colorTexture, v_textureCoordinates);
            float depth = getDepth(texture(depthTexture, v_textureCoordinates));
            vec4 viewPos = toEye(v_textureCoordinates, depth);
            vec3 prjOnPlane = pointProjectOnPlane(u_scanPlaneNormalEC.xyz, u_scanCenterEC.xyz, viewPos.xyz);
            float dis = length(prjOnPlane.xyz - u_scanCenterEC.xyz);
            if(dis < u_radius){
              float f = 1.0 - abs(u_radius - dis) / u_radius;
              f = pow(f, float(` +
      inpram +
      `));
              fragColor = mix(fragColor,u_scanColor,f);
            }
            fragColor.a = fragColor.a / 2.0;
        }
      `;
    return scanSegmentShader;
  }
  /**
   * 清除特效对象
   * @param {*} lastStage 特效对象
   */
  clearScanEffects(lastStage: any) {
    this.viewer.scene.postProcessStages.remove(lastStage);
  }
}
