import React,{useEffect} from 'react'

const ChatBot = () => {

    useEffect(() => {
        let chatbox = document.getElementById('fb-customer-chat');
        chatbox.setAttribute("page_id", "100136589246829");
        chatbox.setAttribute("attribution", "biz_inbox");

        window.fbAsyncInit = function() {
            FB.init({
              xfbml            : true,
              version          : 'v15.0'
            });
          };
    
          (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));
    }, []);
    
  return (
    <div>
        {/* Messenger Chat Plugin Code */}
        <div id="fb-root" />
        {/* Your Chat Plugin code */}
        <div id="fb-customer-chat" className="fb-customerchat">
        </div>
        {/* Your SDK code */}
      </div>
  )
}

export default ChatBot