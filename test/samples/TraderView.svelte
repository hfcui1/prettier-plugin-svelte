<script>
  import {getContext} from 'svelte';
  import {matchProduct$} from '@/modules/copy-trading/streams/basic-stream';
  import {contractMarket24hCache__unstable$} from '@/modules/copy-trading/streams/basic-stream';
  import {displayValue, displayPositionValue, calcCurrentPosition} from '../../../utils';
  import lang from '../../CopyTradingListPage.lang';

  export let position = {};

  const LG = getContext('LG');
  let positionResult = {};

  $: product = $matchProduct$(position.symbol) || {};
  $: isBuySide = position.side === 'Buy';
  $: isSellSide = position.side === 'Sell';
  $: updatePositionResult(position, product, $contractMarket24hCache__unstable$);

  function updatePositionResult(position, product, contractMarket24hCacheData) {
    if (position && product && contractMarket24hCacheData) {
      positionResult = calcCurrentPosition(position, product, contractMarket24hCacheData || {}) || {};
    }
  }

  function generateSgnClass(num) {
    return typeof num !== 'undefined' ? (num >= 0 ? 'plus' : 'minus') : '';
  }
</script>

<style>
  .positon-head {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    height: 44px;
  }
  .postion-item.buy-side {
    border: 1px solid #e1faf2;
  }
  .postion-item.sell-side {
    border: 1px solid #feeeef;
  }
  .buy-side .positon-head {
    background: #e1faf2;
  }
  .sell-side .positon-head {
    background: #feeeef;
  }

  .ml8 {
    margin-left: 8px;
  }
  .pv20 {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .cycle-type {
    border-radius: 5px;
    padding: 0 6px;
    height: 20px;
    line-height: 20px;
  }
  .buy-side .cycle-type {
    background: var(--buy);
  }
  .sell-side .cycle-type {
    background: var(--sell);
  }
  .sgn {
    color: var(--T1);
  }
  .sgn.plus {
    color: #02bd84;
  }
  .sgn.minus {
    color: #f24d53;
  }
  .data-item {
    width: 16.66%;
  }
  @media screen and (max-width: 640px) {
    .position-body {
      flex-wrap: wrap;
    }
    .data-item {
      width: 33.33%;
    }
    .data-item:nth-child(3n) {
      text-align: right;
    }
    .data-item:nth-child(3n-1) {
      text-align: center;
    }
    .data-item:nth-child(n + 4) {
      margin-top: 8px;
    }
  }
</style>

<div class="postion-item mt16 br8" class:buy-side={isBuySide} class:sell-side={isSellSide}>
  <div class="positon-head df aic ph20">
    <div class="cycle-type f12 fw2 TW">{LG(isBuySide ? lang.Long : lang.Short)}</div>
    <div class="ml8 f16 fw2" class:buy={isBuySide} class:sell={isSellSide}>{positionResult.leverage || ''}</div>
    <div class="ml8 f16 fw2">{product.symbolV2} {product.type}</div>
    {#if positionResult.isInverse}<span class="ml8 f14 fw2 T1">Coin-M</span>{/if}
  </div>
  <div class="position-body pv20 jc df jcsb aic ph20">
    <div class="data-item">
      <div class="b f18 T1">${displayValue(positionResult.avgEntryPrice)}</div>
      <div class="mt6 f12 fw2 T3">{LG(lang.OpenPrice)}</div>
    </div>
    <div class="data-item">
      <div class="f18 fw2 T1">{displayPositionValue(positionResult.value, positionResult)} {positionResult.settleCurrency || '-'}</div>
      <div class="mt6 f12 fw2 T3">{LG(lang.PositionValue)}</div>
    </div>
    <div class="data-item">
      <div class="sgn b f18 {generateSgnClass(positionResult.roi)}">{displayValue(positionResult.roi)}%</div>
      <div class="mt6 f12 fw2 T3">{LG(lang.ROI)}</div>
    </div>
    <div class="data-item">
      <div class="sgn f18 fw2 {generateSgnClass(positionResult.pnl)}">{displayPositionValue(positionResult.pnl, positionResult)} {positionResult.settleCurrency || '-'}</div>
      <div class="mt6 f12 fw2 T3">{LG(lang.Income)}</div>
    </div>
    <div class="data-item">
      <div class="b f18 T1">${displayValue(positionResult.markPrice)}</div>
      <div class="mt6 f12 fw2 T3">{LG(lang.MarkPrice)}</div>
    </div>
    <div class="data-item">
      <div class="b f18 T1">${displayValue(positionResult.liquidationPrice)}</div>
      <div class="mt6 f12 fw2 T3">{LG(lang.LipPrice)}</div>
    </div>
    <div class="data-item tr">
      <div class="f18 fw2 T1">{displayPositionValue(positionResult.positionMargin, positionResult)} {positionResult.settleCurrency || '-'}</div>
      <div class="mt6 f12 fw2 T3">{LG(lang.Margin)}</div>
    </div>
  </div>
</div>
