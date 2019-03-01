import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row } from 'reactstrap'
import { walletContract, txAccount } from '../setup'
import { syncAccount } from '../store/actions'

class WalletForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            amount: 0
        }
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col/>
                        <Col>
                            <Form>
                                <br/>
                                <b>User name</b><br/>
                                <Label>{this.props.username}</Label>
                                <hr/>
                                <b>Balance</b><br/>
                                <Label>{this.props.balance}</Label>
                                <hr/>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                                        <Input placeholder="username" 
                                            value={this.state.amount}
                                            onChange={(e) => this.setState({
                                                ...this.state,
                                                amount: e.target.value
                                            })}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Button color="secondary" onClick={() => this.props.put(this.props, this.state.amount)}>Put</Button>{' '}
                                    <Button color="info" onClick={() => this.props.withdraw(this.props, this.state.amount)}>Withdraw</Button>{' '}
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col/>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.account
}

const mapDispatchToProps = dispatch => {
    return {
        put: async (account, amount) => {
            try {
                await walletContract.methods.put(account.address, amount).send({ from: txAccount })
                await updateBalance(Object.assign({}, account), dispatch)
            } catch (e) {
                console.log(e)
            }
        },
        withdraw: async (account, amount) => {
            try {
                await walletContract.methods.withdraw(account.address, amount).send({ from: txAccount })
                await updateBalance(Object.assign({}, account), dispatch)
            } catch (e) {
                console.log(e)
            }
        }
    }
}

async function updateBalance(account, dispatch) {
    const balance = await walletContract.methods.balance(account.address).call()
    account.balance = balance
    dispatch(syncAccount(account))
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm)