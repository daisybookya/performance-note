import { showType } from '../../types/listType'
export function fetchListByType(type:keyof showType='indie') {
  const jsonUrl:showType = {
    //`${process.env.PUBLIC_URL}/classicMusic.json`
    indie:`https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=5`,
    classic:`https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=1`,
    dance:`https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=3`,
    drama:`https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=2`,
    mix:`https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=11`,
  }
  const url = jsonUrl[type]
  return fetch(url)
}
