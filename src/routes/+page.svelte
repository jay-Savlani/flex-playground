<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import SelectInput from './components/SelectInput.svelte';
	import TextBox from './components/TextBox.svelte';
	import {
		cssPropertiesParent,
		cssPropertiesFlexItem,
		convertStyleObjectToCSSString,
		defaultParentFlexBoxCssProperties,
		defaultFlexItemCssProperties,
		replaceInlineCssStr
	} from './helpers';

	let flexItemsNumber = 5;

	let flexParentElement = null;
	let parentFlexBoxCssInlineStyles = '';
	let parentFlexBoxCssProperties = { ...defaultParentFlexBoxCssProperties };
	let editingFlexParentCSSProperties = false;
	let editingChildFlexItemCSSProperties = false;

	let activeFlexBoxItem = '-1';

	let childflexItemsArr = null;
	let defaultChildFlexItemInlineCss = convertStyleObjectToCSSString(defaultFlexItemCssProperties);
	let error = '';

	let showOverlay = true;

	const delay = (delay, cb) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(cb());
			}, delay);
		});
	};

	onMount(() => {
		delay(1500, () => (showOverlay = false));

		flexParentElement = document.getElementById('flex-parent');
		parentFlexBoxCssInlineStyles = convertStyleObjectToCSSString(parentFlexBoxCssProperties);
	});

	const handleChildFlexItemClick = (e, i) => {
		activeFlexBoxItem = i;

		const selfEl = e.target;

		// assign child element data only when flex child item is clicked
		// performance optimisation
		childflexItemsArr[i] = {
			childFlexItemEl: selfEl,
			childFlexItemInlineCss: defaultChildFlexItemInlineCss,
			childFlexItemCssObj: { ...defaultFlexItemCssProperties }
		};

		// svelte assignment to update component
		childflexItemsArr = [...childflexItemsArr];
	};

	const handleSelectChange = (e, styleObj, cssProp, changeInlineCss) => {
		const value = e.target.value;
		styleObj[cssProp] = value;
		changeInlineCss && changeInlineCss();
	};

	const handleFlexParentEditClick = () => {
		editingFlexParentCSSProperties = !editingFlexParentCSSProperties;

		if (!editingFlexParentCSSProperties) {
			cssPropertiesParent.forEach((cssProperty) => {
				parentFlexBoxCssProperties[cssProperty] = flexParentElement.style[cssProperty];
			});
		}
	};

	const handleChildFlexItemEditClick = (activeFlexBoxItem) => {
		editingChildFlexItemCSSProperties = !editingChildFlexItemCSSProperties;

		if (!editingChildFlexItemCSSProperties) {
			const childFlexItemCssObj = childflexItemsArr[activeFlexBoxItem].childFlexItemCssObj;
			const childFlexItemEl = childflexItemsArr[activeFlexBoxItem].childFlexItemEl;
			cssPropertiesFlexItem.forEach((cssProperty) => {
				childFlexItemCssObj[cssProperty] = childFlexItemEl.style[cssProperty];
			});
		}

		// svelte assignment to update component
		childflexItemsArr = [...childflexItemsArr];
	};

	$: if (flexItemsNumber > 50) {
		error = 'More than 50 flex items are restricted !';
		setTimeout(() => {
			error = '';
		}, 2000);
	} else {
		childflexItemsArr = new Array(flexItemsNumber);
		activeFlexBoxItem = -1;
	}
</script>

<svelte:head>
	<title>Flex Playground</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="grow flex flex-col md:flex-row text-white bg-slate-900 overflow-hidden">
	{#if showOverlay}
		<div
			class="absolute top-0 left-0 h-full w-full md:h-[100vh] md:w-[100vw] flex flex-row justify-center items-center backdrop-blur-3xl"
		>
			<div
				transition:fade={{ delay: 100, duration: 300 }}
				class="h-1/2 w-9/12 md:w-1/2 bg-slate-200 rounded-lg flex flex-wrap flex-col gap-2 justify-center items-center shadow-lg"
			>
				<div class="elastic-band-bg h-[100px] w-[100px]" />
				<div class="text-slate-800 tracking-wider text-2xl md:text-4xl text-center">
					FLEXBOX PLAYGROUND
				</div>
			</div>
		</div>
	{/if}

	<section class="md:w-3/4 border-r-2 border-slate-400 p-3">
		<div class="flex flex-row flex-wrap gap-3 justify-between items-center">
			<div
				class="mb-3 md:m-0 flex flex-col md:flex-row flex-wrap gap-2 justify-center items-center w-full lg:w-1/4 bg-slate-700 py-2 md:p-4 order-2 md:order-1"
			>
				<span class="grow text-center">FLEX ITEMS</span>
				<input
					type="number"
					max="50"
					class="w-1/2 text-slate-700 px-3 py-1.5 text-lg text-center focus:bg-slate-200"
					bind:value={flexItemsNumber}
				/>
			</div>
			<div
				class="bg-red-400 text-slate-50 text-center p-1 md:p-4 text-base md:text-2xl grow rounded {!error
					? '-translate-y-60'
					: 'translate-y-0'} transition-all duration-200 ease-in rounded-lg order-1 md:order-2 text-wrap"
			>
				{error}
			</div>
		</div>

		<div
			id="flex-parent"
			class="my-0 md:my-8 flex bg-slate-600 h-[70vh] overflow-y-auto"
			style={parentFlexBoxCssInlineStyles}
		>
			{#if flexItemsNumber <= 50}
				{#each { length: flexItemsNumber } as _, i}
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						in:fade={{ duration: 150 }}
						id="box-{i + 1}"
						style={childflexItemsArr[i]?.childFlexItemInlineCss
							? childflexItemsArr[i].childFlexItemInlineCss
							: ''}
						class="text-slate-900 text-2xl {activeFlexBoxItem === i
							? 'bg-pink-500'
							: 'bg-pink-300'} hover:bg-pink-500 cursor-pointer h-20 w-20 lg:h-24 lg:w-24 rounded-lg m-3 flex flex-row items-center justify-center"
						on:click={(e) => handleChildFlexItemClick(e, i)}
						on:keyup={(e) => {
							if (e.keyCode === 13) {
								activeFlexBoxItem = i;
							}
						}}
					>
						{i + 1}
					</div>
				{/each}
			{/if}
		</div>
	</section>
	<aside class="grow p-3 flex flex-col gap-3 overflow-y-auto overflow-x-hidden">
		<!-- -------------PARENT ELEMENT --------------- -->

		<p class="text-xl">Flex Parent</p>
		<SelectInput
			on:change={(e) =>
				handleSelectChange(e, parentFlexBoxCssProperties, 'flexDirection', () => {
					parentFlexBoxCssInlineStyles = replaceInlineCssStr(
						parentFlexBoxCssInlineStyles,
						'flexDirection',
						e.target.value
					);
				})}
			value={parentFlexBoxCssProperties.flexDirection}
			options={['row', 'column', 'column-reverse', 'row-reverse']}
			label="Flex direction"
		/>
		<SelectInput
			on:change={(e) =>
				handleSelectChange(e, parentFlexBoxCssProperties, 'flexWrap', () => {
					parentFlexBoxCssInlineStyles = replaceInlineCssStr(
						parentFlexBoxCssInlineStyles,
						'flexWrap',
						e.target.value
					);
				})}
			value={parentFlexBoxCssProperties.flexWrap}
			options={['wrap', 'nowrap']}
			label="Flex wrap"
		/>
		<SelectInput
			on:change={(e) =>
				handleSelectChange(e, parentFlexBoxCssProperties, 'justifyContent', () => {
					parentFlexBoxCssInlineStyles = replaceInlineCssStr(
						parentFlexBoxCssInlineStyles,
						'justifyContent',
						e.target.value
					);
				})}
			value={parentFlexBoxCssProperties.justifyContent}
			options={[
				'flex-start',
				'flex-end',
				'center',
				'space-between',
				'space-around',
				'space-evenly'
			]}
			label="Justify content"
		/>
		<SelectInput
			on:change={(e) =>
				handleSelectChange(e, parentFlexBoxCssProperties, 'alignItems', () => {
					parentFlexBoxCssInlineStyles = replaceInlineCssStr(
						parentFlexBoxCssInlineStyles,
						'alignItems',
						e.target.value
					);
				})}
			value={parentFlexBoxCssProperties.alignItems}
			options={['stretch', 'center', 'baseline', 'flex-start', 'flex-end']}
			label="Align items"
		/>

		<SelectInput
			on:change={(e) =>
				handleSelectChange(e, parentFlexBoxCssProperties, 'alignContent', () => {
					parentFlexBoxCssInlineStyles = replaceInlineCssStr(
						parentFlexBoxCssInlineStyles,
						'alignContent',
						e.target.value
					);
				})}
			value={parentFlexBoxCssProperties.alignContent}
			options={[
				'stretch',
				'center',
				'flex-start',
				'flex-end',
				'space-between',
				'space-around',
				'space-evenly'
			]}
			label="Align content"
		/>
		<TextBox
			label="CSS properties"
			bind:value={parentFlexBoxCssInlineStyles}
			buttonLabel={editingFlexParentCSSProperties ? 'Done' : 'Edit'}
			on:click={handleFlexParentEditClick}
		/>

		<!-- -------------CHILD ELEMENT --------------- -->

		{#if activeFlexBoxItem < 0}
			<div class="text-center grow flex flex-col justify-center items-center p-3">
				<p>Click flex box items to start editing css properties</p>
			</div>
		{:else if childflexItemsArr[activeFlexBoxItem]}
			<div class="flex flex-row justify-between items-center">
				<span>Flex Items</span>
				<span class="text-base lg:text-lg font-semibold text-right"
					>Currently editing BOX-{activeFlexBoxItem + 1}</span
				>
			</div>
			<SelectInput
				on:change={(e) =>
					handleSelectChange(
						e,
						childflexItemsArr[activeFlexBoxItem].childFlexItemCssObj,
						'flexGrow',
						() => {
							childflexItemsArr[activeFlexBoxItem].childFlexItemInlineCss = replaceInlineCssStr(
								childflexItemsArr[activeFlexBoxItem].childFlexItemInlineCss,
								'flexGrow',
								e.target.value
							);
						}
					)}
				value={childflexItemsArr[activeFlexBoxItem].childFlexItemCssObj.flexGrow.toString()}
				options={['0', '1', '2', '3']}
				label="Flex grow"
			/>
			<SelectInput
				on:change={(e) =>
					handleSelectChange(
						e,
						childflexItemsArr[activeFlexBoxItem].childFlexItemCssObj,
						'flexShrink',
						() => {
							childflexItemsArr[activeFlexBoxItem].childFlexItemInlineCss = replaceInlineCssStr(
								childflexItemsArr[activeFlexBoxItem].childFlexItemInlineCss,
								'flexShrink',
								e.target.value
							);
						},
						{ isNumber: true }
					)}
				value={childflexItemsArr[activeFlexBoxItem].childFlexItemCssObj.flexShrink.toString()}
				options={['0', '1', '2', '3']}
				label="Flex shrink"
			/>
			<TextBox
				label="CSS properties"
				bind:value={childflexItemsArr[activeFlexBoxItem].childFlexItemInlineCss}
				buttonLabel={editingChildFlexItemCSSProperties ? 'Done' : 'Edit'}
				on:click={() => handleChildFlexItemEditClick(activeFlexBoxItem)}
			/>
		{/if}
	</aside>
</div>

<style>
	.elastic-band-bg {
		background-image: url('../lib//images/elastic-band.webp');
		background-repeat: no-repeat;
		background-size: contain;
	}
</style>
