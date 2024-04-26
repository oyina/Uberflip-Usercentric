<script type="text/javascript" charset="utf-8">
  (function (w) {
  w.addEventListener("load", function () {
    var REMOTE_TO_HUB_PRIVACY_GROUPS = [
      {
        //vimeo
        remotePrivacyGroupId: "vimeo-id",
        hubPrivacyGroupIds: [657054],
      },
      {
        //vimeo
        remotePrivacyGroupId: "toggle-label-hy-ex5nidi-m",
        hubPrivacyGroupIds: [657054],
      }, 
      {
        //Youtube
        remotePrivacyGroupId: 'you-tube-video-id',
        hubPrivacyGroupIds: [657055],
      },
      {
        //Youtube
        remotePrivacyGroupId: 'toggle-label-bjz7q-nsdj-7',
        hubPrivacyGroupIds: [657055],
      },
      {
        //uberflip
        remotePrivacyGroupId: 'uber-flip-id',
        hubPrivacyGroupIds: [657056],
      },
      {
        //uberflip
        remotePrivacyGroupId: 'toggle-label-pawxn8l-y8t85ra',
        hubPrivacyGroupIds: [657056],
      },
      {
        //hybspot
        remotePrivacyGroupId: "hub-spot-forms-id",
        hubPrivacyGroupIds: [657057],
      },
      {
        //hybspot
        remotePrivacyGroupId: "toggle-label-r1fhc4i-oo-wx",
        hubPrivacyGroupIds: [657057],
      },
      {
        //google Analytics
        remotePrivacyGroupId: "google-analytics-id",
        hubPrivacyGroupIds: [700838],
      },
      {
        //google Analytics
        remotePrivacyGroupId: "toggle-label-hkoc-eodjb7",
        hubPrivacyGroupIds: [700838],
      },
      /*{
        //google ad products
        remotePrivacyGroupId: "google-ads-id",
        hubPrivacyGroupIds: [657058],
      },*/
      {
        //Personalized Advertising
        remotePrivacyGroupId: "personalised-advertising-id",
        hubPrivacyGroupIds: [657057, 657056],
      },
      {
        //Personalized Advertising
        remotePrivacyGroupId: "toggle-label-marketing",
        hubPrivacyGroupIds: [657057, 657056],
      },
      {
        //Website Functionality
        remotePrivacyGroupId: "website-functionality-id",
        hubPrivacyGroupIds: [657054, 657055],
      },
      {
        //Website Functionality
        remotePrivacyGroupId: "toggle-label-functional",
        hubPrivacyGroupIds: [657054, 657055],
      },
      {
        //Analytics
        remotePrivacyGroupId: "analytics-id",
        hubPrivacyGroupIds: [700838],
      },
      {
        //Analytics
        remotePrivacyGroupId: "toggle-label-custom-category-17a18cc3-1a29-467d-be73-131cd2320dcb",
        hubPrivacyGroupIds: [700838],
      },
    ];

    //get the usercentric element
    const usercentricElem = document.querySelector("#usercentrics-root");
    
    const usercentricApp = usercentricElem.shadowRoot.querySelector(
      'div[data-testid="uc-app-container"]'
    );
    
    /*const ucAcceptAll = usercentricElem.shadowRoot.querySelector(
      'button[data-testid="uc-accept-all-button"]',
    );
    
    const ucDenyAll = usercentricElem.shadowRoot.querySelector(
      'button[data-testid="uc-deny-all-button"]',
    );
    const ucSaveExit = usercentricElem.shadowRoot.querySelector(
      'button[data-testid="uc-save-button"]',
    );

    const ucGearButton = usercentricElem.shadowRoot.querySelector(
      'button[data-testid="uc-privacy-button"]',
    );
    
    const ucSettings = document.querySelector("#usercentrics-root").shadowRoot.querySelector("div > div > button");
*/
    // Check that the Expected/Required Globals are ready for consumption
    function isPrivacyApiReady() {
      console.log("Api check running");
      return Boolean(
        (typeof w.Hubs !== "undefined" &&
          typeof w.Hubs.Privacy !== "undefined") ||
          (typeof w.uberflip !== "undefined" &&
            typeof w.uberflip.Privacy !== "undefined")
      );
    }

    // Find and bind the Privacy interface
    function bindPrivacy() {
      HubPrivacy = w.uberflip.Privacy;
      console.log(HubPrivacy.getAll());
    }

    //check if user centrics is loaded
    function isUsercentrics() {
      return usercentricElem ? true : false;
    }

    //check if page is in iframe
    function pageInIframe() {
      return window.location !== window.parent.location;
    }
    
    function isUfPageInFrame(){
       /* if(document.body.classList.contains('iframed')){
            console.log(document.body.classList, 'THIS IS UBERFLIPS iframe');    
        }
        else {
            console.log('iframed not here');
        }*/
        return document.body.classList.contains('iframed') ? true : false;
    }
    
    
    function usercentricsButtonListeners(){
        console.log('Eventlistener attached');
        usercentricApp.addEventListener("click", function (e) {
        
        if (e.target.dataset.testid === 'uc-accept-all-button') {
          HubPrivacy.acceptAll();
          console.log("accept all");
          console.log(HubPrivacy.getAll());
          HubPrivacy.applyChanges();
        }
        if (e.target.dataset.testid === 'uc-deny-all-button') {
          HubPrivacy.rejectAll();
          console.log("deny all");
          console.log(HubPrivacy.getAll());
          HubPrivacy.applyChanges();
        }
        if (e.target.dataset.testid === 'uc-save-button') {
          HubPrivacy.applyChanges();
          console.log("save exit");
          console.log(HubPrivacy.getAll());
        }
        //single vendors
        if (e.target.tagName === "path") {
          const parentButton = e.target.closest("button");
          const ucVendorId = parentButton.getAttribute("aria-labelledby");
          const hubId = REMOTE_TO_HUB_PRIVACY_GROUPS.find(function (group) {
            return group.remotePrivacyGroupId === ucVendorId;
          });

          console.log(hubId);
          //console.log(parentButton);
          //console.log(parentButton.getAttribute('aria-checked'));
          //console.log(parentButton.getAttribute('aria-labelledby'));
          //console.log(parentButton.dataset.testid);
          if (hubId) {
            if (parentButton.ariaChecked !== "true") {
              //HubPrivacy.acceptById(hubId.hubPrivacyGroupIds[0]);
              
              hubId.hubPrivacyGroupIds.forEach(function(id){
                HubPrivacy.acceptById(id);
              });
              console.log(HubPrivacy.getAll());
              console.log("button true");
            } else {
              //HubPrivacy.rejectById(hubId.hubPrivacyGroupIds[0]);
              hubId.hubPrivacyGroupIds.forEach(function(id){
                HubPrivacy.rejectById(id);
              });
              console.log(HubPrivacy.getAll());
              console.log("button false");
            }
          }
        }
      });
    }
    
    if(isUfPageInFrame){
        //console.log('triggered');
        if(document.querySelector("#uf-flipbook > iframe")) {
        document.querySelector("#uf-flipbook > iframe").contentWindow.document.querySelector('#usercentrics-root').remove();
        }
    }

    if(isPrivacyApiReady() && isUsercentrics()) {
      bindPrivacy();

      usercentricsButtonListeners();
        
    }
  });
})(window);

</script>
