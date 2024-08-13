import RootUserLayout from '@components/shared/roorUserLayout'
import UseDistributorElements from "@hooks/use-distributor-elements";
import withGuard from "@utils/withGuard";

function RootProductLayout() {

  const { distributorElements } = UseDistributorElements();

  return (
    <RootUserLayout links={distributorElements} />
  );
}
export default withGuard(RootProductLayout);
