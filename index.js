const chromium = require('chrome-aws-lambda');

exports.run = async (event) => {
  let result = null;
  let browser = null;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    let page = await browser.newPage();

    console.log("req is", event)

    const { url } = event.queryStringParameters;
    console.log ("url is", url)

    await page.goto('https://google.com');

    result = await page.title();
    console.log(result)

  } catch (error) {
    return {
        statusCode: 400,
        body: JSON.stringify({error})
      };
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  return {
    statusCode: 200,
    body: result
  };
};