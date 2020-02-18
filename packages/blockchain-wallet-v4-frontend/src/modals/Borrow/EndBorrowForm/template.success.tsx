import { BorrowFormValuesType } from 'data/components/borrow/types'
import {
  Button,
  HeartbeatLoader,
  Icon,
  Text,
  TooltipHost
} from 'blockchain-info-components'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Exchange } from 'blockchain-wallet-v4/src'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { FlyoutWrapper } from 'components/Flyout'
import { Form, FormLabel, NumberBox } from 'components/Form'
import { FormattedMessage } from 'react-intl'
import { LinkDispatchPropsType, OwnProps, SuccessStateType } from '.'
import { maximumAmount, minimumAmount } from '../BorrowForm/validation'
import { selectors } from 'data'
import BorrowCoinDropdown from '../BorrowForm/BorrowCoinDropdown'
import FiatDisplay from 'components/Display/FiatDisplay'
import React from 'react'
import styled from 'styled-components'

const CustomForm = styled(Form)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Top = styled(FlyoutWrapper)`
  padding-bottom: 0px;
`
const TopText = styled(Text)`
  display: flex;
  align-items: center;
`

const AmountsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px 0;
  > div {
    width: 50%;
  }
`
const AmountsHeader = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${props => props.theme.grey600};
`

const Bottom = styled(FlyoutWrapper)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
`

const CustomFormLabel = styled(FormLabel)`
  display: block;
  margin-top: 24px;
`

const CustomField = styled(Field)`
  > input {
    padding-left: 50px;
  }
`

const AmountFieldContainer = styled.div`
  display: flex;
  position: relative;
`

const PrincipalCcyAbsolute = styled.div`
  position: absolute;
  top: 16px;
  left: 12px;
`

type LinkStatePropsType = {
  values?: BorrowFormValuesType
}

export type Props = OwnProps &
  SuccessStateType &
  LinkDispatchPropsType &
  LinkStatePropsType

const Success: React.FC<InjectedFormProps & Props> = props => {
  const principalDisplayName =
    props.supportedCoins[props.loan.principal.amount[0].symbol].displayName
  const collateralSatoshi = Exchange.convertBtcToBtc({
    value: Number(props.loan.collateral.amounts[0].value),
    fromUnit: 'BTC',
    toUnit: 'SAT'
  }).value

  return (
    <CustomForm onSubmit={props.handleSubmit}>
      <Top>
        <TopText color='grey900' size='20px' weight={600}>
          <Icon
            cursor
            style={{ marginRight: '24px' }}
            name='arrow-left'
            size='20px'
            color='grey600'
            onClick={() =>
              props.borrowActions.setStep({
                step: 'DETAILS',
                loan: props.loan,
                offer: props.offer
              })
            }
          />
          <FormattedMessage
            id='modals.borrow.repayloan'
            defaultMessage='Repay Loan'
          />
        </TopText>
        <AmountsContainer>
          <div>
            <AmountsHeader>
              <FormattedMessage
                id='scenes.borrow.endborrow.amount'
                defaultMessage='Borrow Amount'
              />
            </AmountsHeader>
            <Text color='grey800' size='20px' weight={600}>
              {props.loan.principal.amount[0].value} {principalDisplayName}
            </Text>
          </div>
          <div>
            <AmountsHeader>
              <FormattedMessage
                id='scenes.borrow.endborrow.collateral'
                defaultMessage='Collateral Value'
              />
            </AmountsHeader>
            <FiatDisplay
              color='grey800'
              size='20px'
              weight={600}
              currency='USD'
              coin={props.loan.collateral.amounts[0].symbol}
            >
              {collateralSatoshi}
            </FiatDisplay>
          </div>
        </AmountsContainer>
        <CustomFormLabel>
          <Text color='grey600' weight={500} size='14px'>
            <FormattedMessage
              id='modals.endborrow.repayfrom'
              defaultMessage='Repay from'
            />
          </Text>
        </CustomFormLabel>
        <BorrowCoinDropdown {...props} coin='PAX' name='principal' />
        <CustomFormLabel>
          <Text color='grey600' weight={500} size='14px'>
            <FormattedMessage
              id='modals.endborrow.repayamount'
              defaultMessage='Repay amount'
            />
          </Text>
        </CustomFormLabel>
        <AmountFieldContainer>
          <CustomField
            component={NumberBox}
            data-e2e='repayInput'
            name='amount'
            validate={[maximumAmount, minimumAmount]}
            {...{
              errorBottom: true,
              errorLeft: true,
              errorIcon: 'alert-filled'
            }}
          />
          <PrincipalCcyAbsolute>
            <Text color='grey400' size='14px' weight={600}>
              USD
            </Text>
          </PrincipalCcyAbsolute>
        </AmountFieldContainer>
      </Top>
      <Bottom>
        <Button
          nature='primary'
          type='submit'
          data-e2e='endBorrowSubmit'
          disabled={props.submitting || props.invalid}
          fullwidth
        >
          {props.submitting ? (
            <HeartbeatLoader height='16px' width='16px' color='white' />
          ) : (
            <Text size='16px' weight={600} color='white'>
              <FormattedMessage
                id='modals.borrow.endborrow.repay'
                defaultMessage='Complete Repayment'
              />
            </Text>
          )}
        </Button>
      </Bottom>
    </CustomForm>
  )
}

const mapStateToProps = state => ({
  values: selectors.form.getFormValues('endBorrowForm')(state)
})

const enhance = compose<any>(
  reduxForm({ form: 'endBorrowForm', destroyOnUnmount: false }),
  connect(mapStateToProps)
)

export default enhance(Success)
