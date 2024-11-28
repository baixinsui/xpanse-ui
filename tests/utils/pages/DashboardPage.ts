import type { Locator, Page } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly baseUrl: string;
    readonly serviceStaticLocator: Locator;
    readonly successStaticColor: string = 'rgb(63, 134, 0)';
    readonly failureStaticColor: string = 'rgb(207, 19, 34)';
    readonly successDeploymentRedirectUrl: string;
    readonly failedDeploymentsRedirectUrl: string;
    readonly successDestroysRedirectUrl: string;
    readonly failedDestroysRedirectUrl: string;

    constructor(page: Page, baseUrl: string | undefined) {
        this.page = page;
        this.baseUrl = baseUrl ? baseUrl : 'http://localhost:3000';
        this.serviceStaticLocator = page.locator('.ant-statistic-title');
        this.successDeploymentRedirectUrl =
            this.baseUrl + '/myServices?serviceState=deployment+successful&serviceState=modification+successful';
        this.failedDeploymentsRedirectUrl =
            this.baseUrl +
            '/myServices?serviceState=deployment+failed&serviceState=modification+failed&serviceState=rollback+failed';
        this.successDestroysRedirectUrl = this.baseUrl + '/myServices?serviceState=destroy+successful';
        this.failedDestroysRedirectUrl = this.baseUrl + '/myServices?serviceState=destroy+failed';
    }

    async getValueOfStatics(position: number) {
        return await this.serviceStaticLocator
            .nth(position)
            .locator('+.ant-statistic-content') // sibling element selector
            .locator(' .ant-statistic-content-value-int') // descendent element selector
            .textContent();
    }

    getStaticsElementAtPosition(position: number) {
        return this.serviceStaticLocator.nth(position);
    }

    async getStaticsColorAtPosition(position: number) {
        const element = this.serviceStaticLocator
            .nth(position)
            .locator('+.ant-statistic-content')
            .locator(' .ant-statistic-content-value-int');
        return await element.evaluate((el) => {
            return window.getComputedStyle(el).getPropertyValue('color');
        });
    }
}