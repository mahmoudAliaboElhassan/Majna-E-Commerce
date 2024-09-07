import RootUserLayout from '@components/shared/roorUserLayout'
import UseDeliveryElements from '@hooks/use-delivery-elements'
import withGuard from "@utils/withGuard";

function RootDeliveryPanelLayout() {
    const { deliveryElements } = UseDeliveryElements()
    return (
        <RootUserLayout links={deliveryElements} />
    );
}

export default withGuard(RootDeliveryPanelLayout)
