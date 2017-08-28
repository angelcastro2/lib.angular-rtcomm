/**
 * (C) Copyright IBM Corporation 2015.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
  'use strict';

  angular
    .module('angular-rtcomm-service')
    .factory('RtcommConfigService', RtcommConfigService);

  /* @ngInject */
  function RtcommConfigService($location, $log, $window) {

    var service = {
      setProviderConfig: setProviderConfig,
      getProviderConfig: getProviderConfig,
      getWebRTCEnabled: getWebRTCEnabled,
      getChatEnabled: getChatEnabled,
      getBroadcastAudio: getBroadcastAudio,
      getBroadcastVideo: getBroadcastVideo,
      getRingTone: getRingTone,
      getRingBackTone: getRingBackTone,
      getRtcommDebug: getRtcommDebug,
      isRtcommDisabled: isRtcommDisabled,
      getMediaConfig: getMediaConfig,
      getCustomConfig: getCustomConfig
    };

    //Default provider
    var providerConfig = {
      server: $location.host(),
      port: $location.port(),
      rtcommTopicPath: '/rtcomm/',
      createEndpoint: false,
      appContext: 'default',
      userid: '',
      presence: {
        topic: ''
      }
    };

    var customConfig = {
      urlMensajes: '',
      authHeader: '',
      usuarioReceptor: '',
      grupo: ''
    }

    //Rtcomm Endpoint Config Defaults
    var mediaConfig = {
      autoEnable: false,
      chat: true,
      webrtc: true,
      webrtcConfig: {
        broadcast: {
          audio: true,
          video: true
        },
        trickleICE: true
      },
      ringbacktone: null,
      ringtone: null
    };

    //Rtcomm Debug
    var rtcommDebug = 'DEBUG';

    $log.debug('RtcommConfigService: Abs Url: ' + $location.absUrl());
    $log.debug('providerConfig.server: ' + providerConfig.server);
    $log.debug('providerConfig.port: ' + providerConfig.port);

    return service;

    function setProviderConfig(config) {

      //Provider Config
      providerConfig = {

        server: (typeof config.server !== 'undefined') ? config.server : providerConfig.server,
        port: (typeof config.port !== 'undefined') ? config.port : providerConfig.port,
        rtcommTopicPath: (typeof config.rtcommTopicPath !== 'undefined') ? config.rtcommTopicPath : providerConfig.rtcommTopicPath,
        createEndpoint: (typeof config.createEndpoint !== 'undefined') ? config.createEndpoint : providerConfig.createEndpoint,
        appContext: (typeof config.appContext !== 'undefined') ? config.appContext : providerConfig.appContext,
        presence: {
          topic: (typeof config.presenceTopic !== 'undefined') ? config.presenceTopic : providerConfig.presence.topic,
        },
        userid: (typeof config.userid !== 'undefined') ? config.userid : providerConfig.userid
      };
      //configuracion personalizada para soportar nuevos elementos a parte de los de rtcomm
      customConfig = {
        urlMensajes: (typeof config.urlMensajes !== 'undefined')? config.urlMensajes : customConfig.urlMensajes,
        authHeader: (typeof config.authHeader !== 'undefined')? config.authHeader : customConfig.authHeader,
        usuarioReceptor: (typeof config.usuarioReceptor !== 'undefined')? config.usuarioReceptor : customConfig.usuarioReceptor,
        grupo: (typeof config.grupo !== 'undefined')? config.grupo : customConfig.grupo
      }

      //Media Configuration
      mediaConfig = {
        autoEnable: (typeof config.autoEnable !== 'undefined') ? config.autoEnable : mediaConfig.autoEnable,
        chat: (typeof config.chat !== 'undefined') ? config.chat : mediaConfig.chat,
        webrtc: (typeof config.webrtc !== 'undefined') ? config.webrtc : mediaConfig.webrtc,
        webrtcConfig: {
          broadcast: {
            video: typeof config.broadcastVideo !== 'undefined' ? config.broadcastVideo : mediaConfig.webrtcConfig.broadcast.video,
            audio: typeof config.broadcastAudio !== 'undefined' ? config.broadcastAudio : mediaConfig.webrtcConfig.broadcast.audio
          },
          trickleICE: typeof config.trickleICE !== 'undefined' ? config.trickleICE : mediaConfig.webrtcConfig.trickleICE
        },
        ringbacktone: typeof config.ringbacktone !== 'undefined' ? config.ringbacktone : mediaConfig.ringbacktone,
        ringtone: typeof config.ringtone !== 'undefined' ? config.ringtone : mediaConfig.ringtone
      };

      rtcommDebug = (typeof config.rtcommDebug !== 'undefined') ? config.rtcommDebug : rtcommDebug;

      $log.debug('rtcommDebug from config is: ' + config.rtcommDebug);

      $log.debug('providerConfig is: ' + providerConfig);
    }

    function getProviderConfig() {
      return providerConfig;
    }

    function getWebRTCEnabled() {
      return mediaConfig.webrtc;
    }

    function getChatEnabled() {
      return mediaConfig.chat;
    }

    function getBroadcastAudio() {
      return mediaConfig.webrtcConfig.broadcast.audio;
    }

    function getBroadcastVideo() {
      return mediaConfig.webrtcConfig.broadcast.video;
    }

    function getRingTone() {
      return mediaConfig.ringtone;
    }

    function getRingBackTone() {
      return mediaConfig.ringbacktone;
    }

    function getRtcommDebug() {
      return rtcommDebug;
    }

    function isRtcommDisabled() {
      //If locations are different then it is probably inside an iframe so it must be false
      return $window.location !== $window.parent.location;
    }

    function getMediaConfig() {
      return mediaConfig;
    }

    function getCustomConfig() {
      return customConfig;
    }
  }
})();
