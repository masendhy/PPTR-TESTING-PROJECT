const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const config = require('../lib/config')
const click = require('../lib/helpers').click
const typeText = require('../lib/helpers').typeText
const loadUrl = require('../lib/helpers').loadUrl
const waitForText = require('../lib/helpers').waitForText
const pressKey = require('../lib/helpers').pressKey
const shouldExist = require('../lib/helpers').shouldExist
const shouldNotExist = require('../lib/helpers').shouldNotExist

const generateID = require('../lib/utils').generateID
const generateEmail = require('../lib/utils').generateEmail
const generateNumbers = require('../lib/utils').generateNumbers


describe('My first puppeteer test', () => {
    let browser
    let page

    before(async () => {
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevtools,
            timeout: config.launchTimeout,
        })
        page = await browser.newPage();
        await page.setDefaultTimeout(config.waitingTimeout)
        await page.setViewport({
            width: config.viewportWidth,
            height: config.viewportHeight
        })
    })
    after(async () => {
        await browser.close()
    })


    it('My first test step', async () => {
        // await page.goto('https://dev.to/')

        // await page.goto(config.baseUrl)
        await loadUrl(page, config.baseUrl)
        // await page.waitForSelector('#nav-search')
        await shouldExist(page, '#header-search')

        const url = await page.url()
        const title = await page.title()

        expect(url).to.contain('dev')
        expect(title).to.contains('Community')
    })

    it('browser reload', async () => {
        await page.reload()
        // await page.waitForSelector('#page-content')
        await shouldExist(page, '#page-content')

        await waitForText(page, 'body', 'How One Developer Recreated AirDrop Using Just JavaScript')

        const url = await page.url()
        const title = await page.title()

        // await page.waitForTimeout(3000) //bad practise

        expect(url).to.contain('dev')
        expect(title).to.contain('Community')
    })

    it('click method', async () => {
        // await page.goto('https://dev.to/')
        // await page.waitForSelector('#write-link')
        // await page.click('#write-link')
        await loadUrl(page, config.baseUrl)
        await click(page, '.crayons-btn--ghost-brand')
        // await page.waitForSelector('.registration-rainbow')
        await shouldExist(page, '.crayons-layout')
    })

    it('submit searchbox', async () => {
        // await page.goto('https://dev.to/')
        // await page.waitForSelector('#nav-search')
        // await page.type('#nav-search','Javascript')
        await loadUrl(page, config.baseUrl)
        // await typeText(page, 'Javascript', '.crayons-header--search-input')
        await shouldNotExist(page, 'After Effect')
        await typeText(page, generateID(15), '.crayons-header--search-input')
        // await typeText(page, generateNumbers(), '.crayons-header--search-input')
        // await typeText(page, generateEmail(), '.crayons-textfield')
        await page.waitForTimeout(3000)
        // await page.keyboard.press('Enter')
        await pressKey(page, 'Enter')
        // await page.waitForSelector('#articles-list')
        await shouldExist(page, '#articles-list')
    })
})