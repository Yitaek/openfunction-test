const chromium = require('chrome-aws-lambda');

exports.run = async (req, res) => {
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

    console.log("req is", req)

    await page.goto(req.url || 'https://example.com');

    result = await page.title();
    console.log(result)

  } catch (error) {
    return res(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  return res(result);
};