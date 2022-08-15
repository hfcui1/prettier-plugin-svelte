import {Subject, BehaviorSubject} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {mc} from '@/core';
import {userApi} from '@/api';
import {fiatCurrency$} from './fiat-currency';

/**
 * 加载用户数据 如果参数为true，则调用 forceRefreshUserInfo()
 * @type {Subject<unknown>}
 */
export const loadUserInfo$ = new Subject();

export const updateUserInfo$ = new Subject();
export const loadUserTag$ = new Subject();
export const isHnwUser$ = new BehaviorSubject(false);

loadUserInfo$.pipe(switchMap(() => userApi.getUsersSelf())).subscribe(({data, error}) => {
  if (data) {
    updateUserInfo$.next(() => data);
    fiatCurrency$.next(data.currency || 'USD');
  }
  if (error) {
    mc.send('toast', 'error', error);
  }
});

loadUserTag$.pipe(switchMap(() => getTag())).subscribe(({data}) => {
  if (data) {
    const row = data.tagList.find((o) => o.tag === 'hnw' && o.param === 'isHnwUser' && o.value);
    if (row) {
      isHnwUser$.next(true);
    }
  }
});

async function getTag() {
  return userApi.getTag({tags: 'hnw', params: 'isHnwUser'});
}

export async function getBaseKycCheck() {
  const {data, error} = await userApi.getBaseKycCheck();
  if (data) {
    return data;
  }
  if (error) {
    mc.send('toast', 'error', error);
  }
  return {};
}
