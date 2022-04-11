import { IStackTokens, Stack } from "@fluentui/react";
import { ErrorBoundary } from "react-error-boundary";

import CustomQueryBuilder from "../selectors/CustomQueryBuilder";
import ErrorFallback, { handleErrorBoundaryError } from "components/ErrorFallback";
import { MosaicPresetSelector, RenderOptionsSelector } from "../selectors";
import CollectionSelector from "../selectors/CollectionSelector";
import { useExploreSelector } from "pages/Explore/state/hooks";

interface SelectorPaneProps {
  isCustomQuery: boolean;
}

const SelectorPane = ({ isCustomQuery }: SelectorPaneProps) => {
  const { isLoadingInitialState } = useExploreSelector(state => state.mosaic);
  const contents = !isLoadingInitialState && (
    <>
      <CollectionSelector />
      {!isCustomQuery && <MosaicPresetSelector />}
      {isCustomQuery && <CustomQueryBuilder />}
      <RenderOptionsSelector />
    </>
  );
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleErrorBoundaryError}
    >
      <Stack tokens={stackTokens}>{contents}</Stack>
    </ErrorBoundary>
  );
};

export default SelectorPane;

const stackTokens: IStackTokens = {
  childrenGap: 6,
};
