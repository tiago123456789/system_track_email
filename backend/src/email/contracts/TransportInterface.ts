export default interface TransportInterface {

    create(datas: { [key: string]: any }): any;
}