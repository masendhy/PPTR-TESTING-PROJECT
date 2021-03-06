module.exports ={
    click : async function(page, selector){
        try{
        await page.waitForSelector(selector)
        await page.click(selector)
        }
        catch(error){
        throw new Error (`Could not click on selector : ${selector}`)
        }
    },

    typeText:async(page, text, selector)=>{
        try{
            await page.waitForSelector(selector)
            await page.type(selector, text)
        }catch (error){
            throw new Error(`Could not type text into selector :${selector}`)
        }
    },

    loadUrl: async(page, url)=>{
        await page.goto(url, {waitUntil: 'networkidle0'})
    },

    getText:async (page, selector)=>{
        try{
            await page.waitForSelector(selector)
            return page.$eval(selector, e => e.innerHTML)
        } catch (error){
            throw new Error(`Could not get text from selector: ${selector}`)
        }
    },

    getCount: async(page,selector)=>{
        try{
            await page.waitForSelector(selector)
            return page.$$eval(selector, item => item.length)
        } catch{
            throw new Error (`Could not get count of selector : ${selector} `)
        }
    },

    waitForText: async(page, selector, text)=>{
        try{
            await page.waitForSelector(selector)
            await page.waitForFunction((selector, text) =>
            document.querySelector(selector).innerText.includes(text),
            {},
            selector,
            text
            )
        }catch(error){
            throw new Error(`Text:#{text} not found for selector : ${selector}`)
        }
    },

    pressKey: async (page, key)=>{
        try{
            await page.keyboard.press(key)
        }catch(error){
            throw new Error(`Could not press key:${key} on the keyboard`)
        }
    },

    shouldExist: async function(page, selector){
        try {
            await page.waitForSelector(selector, {visible: true})
        } catch (error) {
            throw new Error(`Selector:${selector} not exist`)
        }
    },

    shouldNotExist: async (page,selector)=> {
        try {
            await page.waitForTimeout(() => !document.querySelector(selector) )
        } catch (error) {
            throw new Error(`Selector:${selector} is visible, but should not`)
        }
    }


}