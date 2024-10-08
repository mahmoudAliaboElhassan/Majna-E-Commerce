import RootUserLayout from '@components/shared/roorUserLayout'
import UseReviewerElements from '@hooks/use-reviewer-elements'
import withGuard from "@utils/withGuard";

function RootReviewerPanelLayOut() {
  const { ReviewerElements } = UseReviewerElements()
  return (
    <RootUserLayout links={ReviewerElements} />
  );
}

export default withGuard(RootReviewerPanelLayOut)
