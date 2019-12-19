/// <reference no-default-lib="true"/>

declare interface VReport {

    /**
     * 设置上报事件处理器
     * @param handler 上报事件处理器
     */
    setReportHandler(handler: ({ event: string, data: any }) => {}): void;

    /**
     * 上报事件
     * @param event 事件
     * @param data 数据
     */
    reportEvent(event: string, data: any): void;

}

/**
 * VReport挂在在window和vue里面
 */
declare var VReport: VReport;