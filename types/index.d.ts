declare module "vue-event-report" {

    function install(vue: any): void;

    interface VReport {

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

}


declare var VReport: import("vue-event-report").VReport;

declare interface Window {
    VReport: import("vue-event-report").VReport;
}