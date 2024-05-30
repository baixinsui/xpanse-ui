/*
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Huawei Inc.
 */

import { Alert, Flex, Form, Radio } from 'antd';
import React, { Dispatch, SetStateAction } from 'react';
import serviceOrderStyles from '../../../../styles/service-order.module.css';
import { DeployRequest } from '../../../../xpanse-api/generated';

export const BillingModeSelection = ({
    selectBillingMode,
    setSelectBillingMode,
    billingModes,
}: {
    selectBillingMode: DeployRequest.billingMode;
    setSelectBillingMode: Dispatch<SetStateAction<DeployRequest.billingMode>>;
    billingModes: DeployRequest.billingMode[] | undefined;
}): React.JSX.Element => {
    function onChange(value: DeployRequest.billingMode) {
        setSelectBillingMode(value);
    }

    return (
        <>
            <div
                className={`${serviceOrderStyles.orderFormSelectionStyle} ${serviceOrderStyles.orderFormSelectionFirstInGroup}`}
            >
                <Form.Item
                    key={'BillingMode'}
                    label={<p className={serviceOrderStyles.orderFormItemName}>{'Billing Mode'}</p>}
                    required={true}
                    rules={[
                        {
                            required: true,
                            message: 'billingMode is required',
                        },
                        { type: 'string' },
                    ]}
                >
                    {billingModes && billingModes.length > 0 ? (
                        <Flex vertical gap='middle'>
                            <Radio.Group
                                buttonStyle='solid'
                                onChange={(e) => {
                                    onChange(e.target.value as DeployRequest.billingMode);
                                }}
                                value={selectBillingMode}
                            >
                                {billingModes.map((mode: DeployRequest.billingMode) => (
                                    <Radio.Button key={mode} value={mode}>
                                        {mode}
                                    </Radio.Button>
                                ))}
                            </Radio.Group>
                        </Flex>
                    ) : (
                        <Alert
                            message={'No BillingMode found'}
                            description={'Optional field. Can proceed.'}
                            type={'success'}
                            closable={false}
                        />
                    )}
                </Form.Item>
            </div>
        </>
    );
};
