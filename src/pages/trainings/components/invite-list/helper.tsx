import { Fragment } from 'react';
import { TrainingPalsResponse } from '@redux/pals';
import { Col, Row } from 'antd';

import classes from './index.module.css';

const hightlightStyle: React.CSSProperties = {
    color: '#ff7875'
}

type HighlightTextProps = {
    searchSource: TrainingPalsResponse,
    searchText: string
}

export const HighlightText: React.FC<HighlightTextProps> = ({ searchSource, searchText }) => {
    const { name } = searchSource
    const regEx = new RegExp(searchText, 'ig');
    const parts = name.split(regEx);
    const matchValue = name.match(regEx)

    if (!searchText) return name

    return (
        matchValue && parts.map((part: string, index: number, arr: string[]) => {
            if (index < arr.length - 1) {
                return (
                    <Fragment key={arr[index]}>{part}<span style={hightlightStyle} >
                        {matchValue.shift()}
                    </span>
                    </Fragment>)
            }

            return part
        })
    );
}


interface DescriptionItemProps {
    title: string;
    content: React.ReactNode;
}

export const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
    <Row>
        <Col span={24}>
            <div className={classes.description_wrapper}>
                <p className={classes.description_label}>{title}:</p>
                <p className={classes.description_content}>{content}</p>
            </div>
        </Col>
    </Row>
);

export const setSearchedValue = (joinList: TrainingPalsResponse[], searchText: string) =>
    joinList.filter((joinTraining) => joinTraining.name
        .toLowerCase()
        .includes(searchText.toLowerCase()))