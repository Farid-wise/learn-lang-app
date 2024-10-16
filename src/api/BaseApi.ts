import type { Ref } from "vue";

interface IBaseAPI {
    get<T>({url, source}: Omit<HandlersType<T>, 'data'>): Promise<T | null>
    create<T>({url, data, source}: HandlersType<T>): Promise<void>
}

export type HandlersType<T = null> = {
    url? : string,
    source: Ref<'firebase' | 'localstorage'> | 'firebase' | 'localstorage',
    data?: T
    
}

export type OmitedHandlersType = Omit<HandlersType, 'data'>

export abstract class BaseAPI implements IBaseAPI {

    abstract get<T>({url, source}: OmitedHandlersType): Promise<T | null>
    
    abstract create<T>({url, data, source}: HandlersType<T>): Promise<void>
}