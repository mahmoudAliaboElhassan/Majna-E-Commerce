import React from 'react'

import RootUserLayout from '@components/roorUserLayout'
import UseCustomerElements from '@hooks/use-customer-elements'

function RootCustomerPanelLayOut() {
    const { customerElements } = UseCustomerElements()
    return (
        <RootUserLayout links={customerElements} />
    )
}

export default RootCustomerPanelLayOut
