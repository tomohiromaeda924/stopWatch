      var date;//スタート時点
      //var date2;
      var newDate = 0;
      var now;//出力タイム
      var elapsedTime = 0;//stop時経過時間
      var setInt;//countのセットインターバル代入
      var minutes;
      var seconds;
      var milliseconds;
      var countScreen = document.getElementById("countScreen");
      var startButton = document.getElementById("start");
      var stopButto = document.getElementById("stop");
      var reSetButton = document.getElementById("reset");
      
      var bStart = startButton.classList;//スタートボタンclass取得//修正
      var bStop = stopButto.classList;//ストップボタンclass取得
      var bReset = reSetButton.classList;//リセットボタンclass取得


       //初期00:00.000を表示
      countScreen.innerHTML="00:00.000";
      //staetボタン活性化
      bStart.remove("bcolor");
      bStop.add("bcolor");//ストップボタン非活性化
      bReset.add("bcolor");//リセットボタン非活性化

      startButton.addEventListener('click', start, false);

      stopButto.addEventListener('click', stop, false);

      reSetButton.addEventListener('click', reset, false);

      //stopボタン機能を削除する
      stopButto.removeEventListener('click', stop);
      //resetボタン機能を削除する
      reSetButton.removeEventListener("click", reset);


      function start(){
      bStart.add("bcolor");//スタートボタン非活性化
      bStop.remove("bcolor");//スタートボタン活性化
      bReset.add("bcolor");//リセットボタン非活性化

        date = Date.now();//スタート時点
        //カウントを1ミリ秒ごとに行う
        setInt = setInterval(count,1);
        //count();

        //startボタンが押された後stopボタン機能を再設定する
        stopButto.addEventListener('click', stop);
        //startボタンが押された後startボタン機能を削除する
        startButton.removeEventListener("click", start);
        //startボタンが押された後resetボタン機能を削除する
        reSetButton.removeEventListener("click", reset);
      }

      function count(){


        newDate = (Date.now() - date) + elapsedTime;

        //経過時間取
        //newDate = date2.getTime() - date.getTime();
        //経過時間を分に変換
        minutes = Math.floor(newDate / 60000);
        //経過時間を秒に変換
        seconds = Math.floor(newDate / 1000)% 60
        //経過時間をミリ秒に変換
        milliseconds = newDate % 1000;
        //フォーマット後の時間を出力
        countScreen.innerHTML= `${format(minutes, 2)}:${format(seconds, 2)}.${format(milliseconds, 3)}`;
        //setInt = setTimeout("count()", 1);
      }

        //時間を出力形式にフォーマット
        function format(s, n) {//こんなの思いつきません。
          //文字列にする
          s = "" + s;
          //"0".repeat(Math.max(0, n - s.length)　=　0をmax回数個連結する。　　その後各時間を連結
          var b = "0".repeat(Math.max(0, n - s.length)) + s;
          return b;
        }


        function stop(){
          bStart.remove("bcolor");//スタートボタン活性化
          bStop.add("bcolor");//ストップボタン非活性化
          bReset.remove("bcolor");//リセットボタン活性化

          //count関数止める
          clearInterval(setInt);
          elapsedTime = newDate;
          startButton.addEventListener('click', start);//スタートボタン活性化
          reSetButton.addEventListener('click', reset);//リセットボタン活性化
          stopButto.removeEventListener("click", stop);//ストップボタン非活性化
        }

        function reset(){
          bStart.remove("bcolor");//スタートボタン活性化
          bStop.add("bcolor");//ストップボタン非活性化
          bReset.add("bcolor");//リセットボタン非活性化
          stopButto.removeEventListener("click", stop);//ストップボタン非活性化
          //表示リセット
          countScreen.innerHTML="00:00.000";
          //リセット
          newDate = 0;
          elapsedTime = 0;
        }