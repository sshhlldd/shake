      //小人类
      function Person(bitmapdata) {
          base(this, LSprite, []);
          var self = this;
          self.selfmode = "";
          var list = LGlobal.divideCoordinate(796, 358, 2, 4);
          var data = bitmapdata
          self.anime = new LAnimation(self, data, list);
          /* self.addShape(LShape.RECT, [0, 0, 30, 30]); */
          self.step = 3, self.stepindex = 0;
      }
      Person.prototype.run = function() {
          var self = this;
          if (self.stepindex++ > self.step) {
              self.stepindex = 0;
              self.anime.onframe();
          }

          if (self.mode == "left") {
              self.clearShape()
              self.addShape(LShape.RECT, [40, 70, 40, 70]);

          } else if (self.mode == "right") {
              self.clearShape()
              self.addShape(LShape.RECT, [130, 70, 40, 70]);
          }
      }

      function ListButton(x, y, w, h, value, layer) {
          var self = this;
          self.btnUp = new LBitmap(new LBitmapData("#000", 0, 0, w, h));
          self.btn = new LButton(self.btnUp);
          self.btn.alpha = 0;
          self.btn.x = x;
          self.btn.y = y;
          self.btn.name = value;
          layer.addChild(self.btn);
          return self.btn;
      }

      function txtMenu(text, layer, x, y) {
          var self = this;
          self.txt = new LTextField();
          self.txt.size = 22;
          self.txt.setWordWrap(true, 26);
          self.txt.x = x;
          self.txt.y = y;
          self.txt.alpha = 0.6;
          self.txt.color = "#fff";
          self.txt.font = "微软雅黑";
          self.txt.text = text;
          layer.addChild(self.txt);
          return self.txt;
      }
      //中心点移到00
      function MiddleBitmap(bitmapData) {
          var self = this;
          base(self, LSprite, []);
          self.bitmapTitle = new LBitmap(bitmapData);
          self.bitmapTitle.x = -self.bitmapTitle.getWidth() * 0.5;
          self.bitmapTitle.y = -self.bitmapTitle.getHeight() * 0.5;
          self.addChild(self.bitmapTitle);
      }

      function BackGround(bg01, bg02) {
          var self = this;
          base(self, LSprite, []);
          self.bitmapBG01 = new LBitmap(new LBitmapData(bg01));
          self.bitmapBG01.x = -self.bitmapBG01.getWidth() * 0.5;
          self.bitmapBG01.y = -self.bitmapBG01.getHeight() * 0.5;


          self.addChild(self.bitmapBG01);
          self.bitmapBG02 = new LBitmap(new LBitmapData(bg02));
          self.bitmapBG02.x = -self.bitmapBG02.getWidth() * 0.5;
          self.bitmapBG02.y = -self.bitmapBG02.getHeight() * 0.5;
          self.addChild(self.bitmapBG02);
          self.run();
      }
      /**
       * 让背景类的两个图片中的上层图片，不断的交替显示和隐藏状态，以达到明暗交替闪烁的效果
       * */
      BackGround.prototype.run = function() {
          var self = this;
          var tween = LTweenLite.to(self.bitmapBG02, 0.5, { alpha: 0, ease: Bounce.easeIn, loop: true }).
          to(self.bitmapBG02, 0.5, { alpha: 1, ease: Bounce.easeIn });
      }

      function mypop(tit, html) {
          $('.ec_pop').remove();

          $('.ec_pop').off('click', '.close')
          var modalDiv = '<div class="ec_pop">\
          <div class="cover"></div>\
          <div class="pop_box">\
          <div class="pop_head"><button type="button" class="close">×</button><h4>' + tit + '</h4></div>\
          <div class="pop_body" style="">' + html + '</div>\
          </div></div>';
          $('body').append(modalDiv);
          $(".pop_box").addClass("animation-dialogue-in");
          $("body,html").addClass("forbid-scroll"); //弹出层后，禁用body和html滚动  
          $('body').on('click', function(event) {
              event.stopPropagation();
          })
          $('.ec_pop').on('click', '.close', function(event) {
              event.stopPropagation();
              $(this).parents('.ec_pop').hide();
              $(".pop_box").removeClass("animation-dialogue-in");
              $("body,html").removeClass("forbid-scroll");
          })
      }

      //去掉微信导航
      document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
          WeixinJSBridge.call('hideToolbar');
          WeixinJSBridge.call('hideOptionMenu');
      });

      //防止底部滑动
      var touchTarget,
          touchScreenX,
          touchScreenY,
          conditionParentUntilTrue,
          disableScroll;

      conditionParentUntilTrue = function(element, condition) {
          var outcome;

          if (element === document.body) {
              return false;
          }

          outcome = condition(element);

          if (outcome) {
              return true;
          } else {
              return conditionParentUntilTrue(element.parentNode, condition);
          }
      };

      window.addEventListener('touchstart', function(e) {
          touchTarget = e.targetTouches[0].target;
          scrollMap = {}

          scrollMap.left = conditionParentUntilTrue(touchTarget, function(element) {
              return element.scrollLeft > 0;
          });

          scrollMap.top = conditionParentUntilTrue(touchTarget, function(element) {
              return element.scrollTop > 0;
          });

          scrollMap.right = conditionParentUntilTrue(touchTarget, function(element) {
              return element.scrollWidth > element.clientWidth &&
                  element.scrollWidth - element.clientWidth > element.scrollLeft;
          });

          scrollMap.bottom = conditionParentUntilTrue(touchTarget, function(element) {
              return element.scrollHeight > element.clientHeight &&
                  element.scrollHeight - element.clientHeight > element.scrollTop;
          });

          touchScreenX = e.targetTouches[0].screenX;
          touchScreenY = e.targetTouches[0].screenY;
          disableScroll = false;
      });

      window.addEventListener('touchmove', function(e) {
          var moveScreenX,
              moveScreenY;

          if (disableScroll) {
              e.preventDefault();
              return;
          }

          moveScreenX = e.targetTouches[0].screenX;
          moveScreenY = e.targetTouches[0].screenY;

          if (
              moveScreenX > touchScreenX && scrollMap.left ||
              moveScreenY < touchScreenY && scrollMap.bottom ||
              moveScreenX < touchScreenX && scrollMap.right ||
              moveScreenY > touchScreenY && scrollMap.top
          ) {} else {
              e.preventDefault();
              disableScroll = true;
          }
      });