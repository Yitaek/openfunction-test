const puppeteer = require("puppeteer");

// we're using async/await - so we need an async function, that we can run
module.exports.run = async () => {
  // open the browser and prepare a page
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // set the size of the viewport, so our screenshot will have the desired size
  await page.setViewport({
      width: 640,
      height: 400
  })

  await page.goto('https://google.com/')
  await page.screenshot({
      path: 'google.png',
      fullPage: true
  })

  // close the browser 
  await browser.close();
};
