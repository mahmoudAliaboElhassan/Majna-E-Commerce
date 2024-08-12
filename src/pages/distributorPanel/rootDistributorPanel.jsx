import RootUserLayout from "@components/roorUserLayout";
import UseDistributorElements from "@hooks/use-distributor-elements";

function RootProductLayout() {

  const { distributorElements } = UseDistributorElements();

  return (
    <RootUserLayout links={distributorElements} />
  );
}
export default (RootProductLayout);
