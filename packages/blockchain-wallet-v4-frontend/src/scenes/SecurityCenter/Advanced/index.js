import React, { PureComponent } from 'react'
import styled from 'styled-components'

import ActivityLogging from './ActivityLogging'
import APIAccess from './APIAccess'
import IPWhitelist from './IPWhitelist'
import LoginIpRestriction from './LoginIpRestriction'
import PasswordStretching from './PasswordStretching'
import WalletAccessTor from './WalletAccessTor'
import PasswordHint from './PasswordHint'
import WalletPassword from './WalletPassword'
import SecondPasswordWallet from './SecondPasswordWallet'

import { Link } from 'blockchain-info-components'
import { FormattedMessage } from 'react-intl'

const AdvancedContainer = styled.div`
  margin-top: 0px !important;
`
export default class Advanced extends PureComponent {
  componentDidMount () {
    const button = document.getElementById('advanced-button')
    button.scrollIntoView()
  }

  render () {
    return (
      <AdvancedContainer>
        {!this.props.tabs && <Link size='14px' weight={300} onClick={() => this.props.setView('security')} id='advanced-button'>
          <FormattedMessage id='scenes.securitycenter.advanced.goback' defaultMessage='< Back' />
        </Link>}
        <WalletPassword />
        <PasswordHint />
        <SecondPasswordWallet />
        <ActivityLogging />
        <IPWhitelist />
        <LoginIpRestriction />
        <WalletAccessTor />
        <PasswordStretching />
        <APIAccess />
      </AdvancedContainer>
    )
  }
}
