import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlHelper {
    getSearchableValues(): string[] {
        return [
            //CABA
            'https://autos.mercadolibre.com.ar/volkswagen/golf/manual/capital-federal/desde-2016/volkswagen-golf_PriceRange_0USD-17000USD_KILOMETERS_*-75000km_NoIndex_True_SHORT*VERSION_2160764#applied_filter_id=state&applied_filter_name=Ubicación&applied_filter_order=2&applied_value_id=TUxBUENBUGw3M2E1&applied_value_name=Capital+Federal&applied_value_order=5&applied_value_results=7&is_custom=false',

            //GBA NORTE
            'https://autos.mercadolibre.com.ar/volkswagen/golf/manual/bsas-gba-norte/desde-2016/volkswagen-golf_PriceRange_0USD-17000USD_KILOMETERS_*-75000km_NoIndex_True_SHORT*VERSION_2160764#applied_filter_id=state&applied_filter_name=Ubicación&applied_filter_order=2&applied_value_id=TUxBUEdSQWU4ZDkz&applied_value_name=Bs.As.+G.B.A.+Norte&applied_value_order=1&applied_value_results=4&is_custom=false',

            //GBA OESTE
            'https://autos.mercadolibre.com.ar/volkswagen/golf/manual/bsas-gba-oeste/desde-2016/volkswagen-golf_PriceRange_0USD-17000USD_KILOMETERS_*-75000km_NoIndex_True_SHORT*VERSION_2160764#applied_filter_id=state&applied_filter_name=Ubicación&applied_filter_order=2&applied_value_id=TUxBUEdSQWVmNTVm&applied_value_name=Bs.As.+G.B.A.+Oeste&applied_value_order=2&applied_value_results=2&is_custom=false'
        ]
    }
}