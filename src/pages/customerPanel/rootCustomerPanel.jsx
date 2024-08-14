import RootUserLayout from '@components/shared/roorUserLayout'
import UseCustomerElements from '@hooks/use-customer-elements'
import withGuard from "@utils/withGuard";

function RootCustomerPanelLayOut() {
    const { customerElements } = UseCustomerElements()
    return (
        <RootUserLayout links={customerElements} />
    );
}

export default (RootCustomerPanelLayOut)
