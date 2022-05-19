declare module "vue-event-report" {

    /**
     * 初始化
     * @param vue vue
     */
    function install(vue: any): void;

    /**
     * 设置上报事件处理器
     * @param handler 上报事件处理器
     */
    function setReportHandler(handler: ({ event: string, data: any }) => {}): void;

    /**
     * 上报事件
     * @param event 事件
     * @param data 数据
     */
    function reportEvent(event: string, data: any): void;

}