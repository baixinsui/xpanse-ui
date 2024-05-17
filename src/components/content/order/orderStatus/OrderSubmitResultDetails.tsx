/*
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Huawei Inc.
 */

import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { myServicesRoute } from '../../../utils/constants';

function OrderSubmitResultDetails({ msg, uuid }: { msg: string | React.JSX.Element; uuid: string }): React.JSX.Element {
    const { Paragraph } = Typography;
    const navigate = useNavigate();
    return (
        <div>
            <div className={'service-instance-detail-position'}>
                Service ID:&nbsp;
                <Paragraph
                    className={'service-instance-Paragraph'}
                    copyable={{
                        text: String(uuid),
                        icon: [
                            <CopyOutlined className={'show-details-typography-copy'} key={uuidv4()} />,
                            <CheckOutlined className={'show-details-typography-copy'} key={uuidv4()} />,
                        ],
                    }}
                >
                    <span
                        onClick={() => {
                            navigate({
                                pathname: myServicesRoute,
                                search: createSearchParams({
                                    serviceId: uuid,
                                }).toString(),
                            });
                        }}
                        className={'show-details-typography-copy-info'}
                    >
                        {uuid}
                    </span>
                </Paragraph>
            </div>
            {msg}
        </div>
    );
}

export default OrderSubmitResultDetails;
