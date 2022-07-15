<script>
  import {of} from 'rxjs';
  import {map} from 'rxjs/operators';
  import {getContext} from 'svelte';
  import {fullImageUrlFun} from '@/helper/url';
  import Button from '@/widgets/Button.svelte';
  import {linkToTraderOverview} from '../../utils';
  import Position from './PositionView.svelte';
  import lang from '../../CopyTradingListPage.lang';

  export let trader = {};
  export let showRealPositon;

  const LG = getContext('LG');
  const fullImageUrl = fullImageUrlFun();

  let showPositions = [];
  let isFullStatus = false;
  let isHavePosition = false;
  let currentShowRealPosition = false;

  $: updateShowPositions(isFullStatus, trader);
  $: updateIsHavePosition(trader);
  $: updateCurrentShowRealPosition(showRealPositon, isHavePosition);

  function updateShowPositions(isFullStatus, trader) {
    const currentPositions = trader.currentPositions || [];
    if (isFullStatus) {
      showPositions = currentPositions;
      return;
    }

    showPositions = currentPositions.slice(0, 3);
  }

  function updateIsHavePosition(trader) {
    isHavePosition = (trader.currentPositions || []).length > 0;
  }

  function updateCurrentShowRealPosition(showRealPositon, isHavePosition) {
    // 收起状态：对任何一个交易员都起作用
    if (!showRealPositon) {
      currentShowRealPosition = false;
      return;
    }

    // 展开状态：仅对有仓位的交易员起作用
    if (isHavePosition) {
      currentShowRealPosition = true;
    }
  }

  function handleHeaderCLick() {
    currentShowRealPosition = !currentShowRealPosition;
  }

  function hanleViewAllClick() {
    handleOverviewClick();
  }

  function handleOverviewClick() {
    linkToTraderOverview(trader.userId);
  }
</script>

<style></style>

<div class="trader-item mt20 br12 B1">
  <div class="trader-header df aic" class:expand={currentShowRealPosition}>
    <img src={fullImageUrl(trader.avatar)} class="trader-avatar brp50 cp" width="60" height="60" alt="phemex" on:click={handleOverviewClick} />
    <div class="f1 ml12 ooo">
      <span class="mt0 mb8 b f18 cp ooo" on:click={handleOverviewClick}>{trader.nickName}</span>
    </div>
    <div class="df aic T3 fw2 cp" on:click={handleHeaderCLick}>
      <div class="f14">
        {isHavePosition ? LG(lang.CurrentPosition) : LG(lang.NoPosition)}
      </div>
      <i class="f11 shut-icon ml8 iconfont" class:pack-up={!currentShowRealPosition}>&#xe608;</i>
    </div>
  </div>
  {#if currentShowRealPosition}
    <div class="position-wrap">
      {#each showPositions || [] as position (position.positionId)}
        <Position {position} />
      {:else}
        <div class="no-position df jcc T4 f14 fw2">{LG(lang.NoPosition)}</div>
      {/each}
      {#if (trader.currentPositions || []).length > 3 && !isFullStatus}
        <div class="va-btn df jcc mt20" on:click={hanleViewAllClick}>
          <Button newRadius size="small">{LG(lang.ViewAll)}</Button>
        </div>
      {/if}
    </div>
  {/if}
</div>
