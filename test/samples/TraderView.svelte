<script>
  import {parse} from 'query-string';
  import {getContext} from 'svelte';
  import {fade} from 'svelte/transition';
  import Spin from '@/widgets/Spin.svelte';
  import Tab from '@/widgets/Tab.svelte';
  import {tabMode, tabModeMap, pathModeMap} from './utils';
  import {followingTradersPageNum$, followingTradersState$, recommendTradersPageNum$, copyTradeTab$} from './streams';
  import Banner from './components/banner/Banner.svelte';
  import FollowTraders from './components/follow-traders/FollowTradersView.svelte';
  import RecommendTraders from './components/recommend-traders/RecommendTradersView.svelte';
  import lang from './CopyTradingListPage.lang';

  const LG = getContext('LG');
  const tabOptions = [
    {label: LG(lang.Following), value: tabMode.follow},
    {label: LG(lang.Recommend), value: tabMode.recommend},
  ];
  $: process.browser && updateCurrentTab($followingTradersState$);

  function updateCurrentTab(followingTradersState) {
    const tab1 = getTabByUrl();
    const tab2 = getTabByFollowingState(followingTradersState);

    copyTradeTab$.next(tab1 || tab2 || '');
  }

  function getTabByUrl() {
    const searchT = parse(window.location.search).t;
    return pathModeMap[searchT];
  }

  function getTabByFollowingState(followingTradersState) {
    const {loading, total} = followingTradersState;
    if (!loading) {
      const {follow, recommend} = tabMode;
      return total > 0 ? follow : recommend;
    }
  }

  function handleTabClickFun(tabValue) {
    return function () {
      copyTradeTab$.next(tabValue);

      refreshList(tabValue);
      recordTab(tabValue);
    };
  }

  function recordTab(tabValue) {
    history.replaceState({}, '', `${location.pathname}?t=${tabModeMap[tabValue]}`);
  }

  function refreshList(tabValue) {
    const {follow, recommend} = tabMode;

    if (tabValue === follow) {
      followingTradersPageNum$.next(followingTradersPageNum$.getValue());
    }
    if (tabValue === recommend) {
      recommendTradersPageNum$.next(recommendTradersPageNum$.getValue());
    }
  }
</script>

<style>
  .container {
    background: #fdfefe;
  }
  .main {
    width: 1200px;
    margin: 0 auto;
  }
  .menu-wrap {
    padding-top: 17px;
  }
  .menu-wrap::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -5px;
    height: 1px;
    background: #f2f3f6;
  }
  .menu-wrap :global(.wrap) {
    padding-left: 0;
    padding-right: 0;
  }
  .menu-wrap :global(.wrap + .wrap) {
    padding-left: 0 !important;
    margin-left: 36px;
  }
  .menu-wrap :global(.active::after) {
    bottom: -3px;
    height: 3px;
  }
  .loading-box {
    height: 500px;
  }
  .main {
    min-height: 500px;
  }
  .container :global(.pagination li) {
    border: 1px solid #f1f2f5;
    border-radius: 4px;
    min-width: 30px;
    width: auto;
    height: 30px;
    background: var(--B1);
    color: var(--T4);
    font-weight: var(--fw2);
  }
  .container :global(.pagination li.active) {
    background: #003fe6;
    color: var(--TW);
  }
  @media screen and (max-width: 640px) {
    .main {
      width: 100%;
      box-sizing: border-box;
      padding: 0 14px;
    }
    .main :global(.fdr) {
      padding: 16px 0;
    }
    .container {
      background: transparent;
    }
    .menu-wrap {
      padding-top: 0;
    }
  }
</style>

<Banner />
<div class="container">
  <main class="main">
    <div class="menu-wrap pr df aic">
      {#each tabOptions as tab}
        <Tab active={$copyTradeTab$ === tab.value} on:click={handleTabClickFun(tab.value)}>
          <div class="b f20">{tab.label}</div>
        </Tab>
      {/each}
    </div>

    {#if $followingTradersState$.loading !== false}
      <div class="loading-box jsc df aic">
        <Spin style="" />
      </div>
    {/if}

    <div hidden={$copyTradeTab$ !== tabMode.follow} in:fade>
      <FollowTraders />
    </div>
    <div hidden={$copyTradeTab$ !== tabMode.recommend} in:fade>
      <RecommendTraders />
    </div>
  </main>
</div>
