const puppeteer = require("puppeteer");

const username = "",
  password = "",
  amount = 1;

(async () => {
  const browser = await puppeteer.launch({ headless: !false });
  const page = await browser.newPage();
  await page.goto("https://instagram.com/accounts/login"); // instagram login page
  await (await page.waitForSelector("input[name='username']")).type(username); // type username
  await (await page.waitForSelector("input[name='password']")).type(password); // type password
  await (await page.waitForSelector("button[type='submit']")).click(); // click login button
  await page.waitForSelector(`a[href='/${username}/']`).then(async () => { // wait until logged in 
    await page.goto(`https://instagram.com/${username}/saved/`); // go to user saved page
  });
  await page.waitForSelector("article[class='FyNDV']").then(async () => { // wait until page loads
    await (await page.waitForSelector("div[class='_9AhH0']")).click(); // find first item in save list
  });
  let i = 0;
  while (i < amount) { // run n amount of times
    i++;
    await (await page.waitForSelector("svg[aria-label='Remove']")).click(); // click unsave button
    await (
      await page.waitForSelector("div[class='D1AKJ'] > a:last-child") // click next item
    ).click();
  }
  await await page.screenshot({ path: "example.png" });
  await browser.close();
})();
