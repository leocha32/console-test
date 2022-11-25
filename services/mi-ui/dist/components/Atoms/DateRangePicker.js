import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { useMemo, useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import IconButton from '@mui/material/IconButton';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import EventIcon from '@mui/icons-material/Event';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
const MuiDatePick = styled.div(({ theme }) => ({
    '& .MuiPickerStaticWrapper-content': {
        transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
        borderRadius: '4px',
        boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), ' +
            '0px 8px 10px 1px rgb(0 0 0 / 14%), ' +
            '0px 3px 14px 2px rgb(0 0 0 / 12%)',
        outline: 0,
    },
    '&.Mui-selected': {
        backgroundColor: theme === null || theme === void 0 ? void 0 : theme.color.primary.PRIMARY_600,
    },
}));
export const DateRangePickerCustomPickersDay = styled(PickersDay)(({ theme, between, first, last }) => (Object.assign(Object.assign(Object.assign({
    margin: '0',
    transition: 'none',
    '&.Mui-selected ': {
        backgroundColor: theme === null || theme === void 0 ? void 0 : theme.color.primary.PRIMARY_600,
    },
    '&:focus.Mui-selected': {
        backgroundColor: theme === null || theme === void 0 ? void 0 : theme.color.primary.PRIMARY_600,
    },
    '&:hover.Mui-selected': {
        backgroundColor: theme === null || theme === void 0 ? void 0 : theme.color.primary.PRIMARY_600,
    },
}, (between
    ? {
        borderRadius: 0,
        backgroundColor: theme === null || theme === void 0 ? void 0 : theme.color.primary.PRIMARY_600,
        color: theme === null || theme === void 0 ? void 0 : theme.color.mono.MONO_WHITE,
        '&:hover, &:focus &.Mui-selected': {
            backgroundColor: theme === null || theme === void 0 ? void 0 : theme.color.primary.PRIMARY_600,
        },
    }
    : null)), (first
    ? {
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
    }
    : null)), (last
    ? {
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
        '&.Mui-selected': {},
    }
    : null))));
export const DateRangePicker = ({ onChange, startDate = new Date(), endDate = new Date(), size = 'medium', placeholder = '선택하세요', }) => {
    const modalRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [lastSelectedDate, setLastSelectedDate] = useState('end');
    const [startDateState, setStartDateState] = useState(startDate);
    const [endDateState, setEndDateState] = useState(endDate);
    const [viewChangeState, setViewChangeState] = useState(false);
    const clickModalOutside = (event) => {
        var _a;
        if (open && !((_a = modalRef === null || modalRef === void 0 ? void 0 : modalRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target))) {
            onClose();
        }
    };
    const onClose = () => {
        if (!endDateState)
            setEndDateState(startDateState);
        if (onChange)
            onChange(startDateState, endDateState);
        setOpen(false);
    };
    useEffect(() => {
        document.addEventListener('mousedown', clickModalOutside);
        return () => {
            document.removeEventListener('mousedown', clickModalOutside);
        };
    });
    const textFieldValue = useMemo(() => {
        if (!startDateState && !endDateState)
            return placeholder;
        if (startDateState && !endDateState)
            return `${dayjs(startDateState).format('YYYY-MM-DD')} - ${placeholder}`;
        if (!startDateState && endDateState)
            return `${placeholder} - ${dayjs(endDateState).format('YYYY-MM-DD')}`;
        return `${dayjs(startDateState).format('YYYY-MM-DD')} - ${dayjs(endDateState).format('YYYY-MM-DD')}`;
    }, [endDateState, placeholder, startDateState]);
    const renderSelectedDays = (day, selectedDays, pickersDayProps) => {
        if (!startDateState) {
            return (_jsx(DateRangePickerCustomPickersDay, Object.assign({}, pickersDayProps, { between: 0, first: 0, last: 0, selected: false })));
        }
        const currentDate = dayjs(day);
        const startDate = dayjs(startDateState);
        const endDate = dayjs(endDateState);
        const between = currentDate.isSameOrAfter(startDate, 'day') &&
            currentDate.isSameOrBefore(endDate, 'day');
        const firstDay = currentDate.isSame(startDate, 'day');
        const lastDay = currentDate.isSame(endDate, 'day');
        return (_jsx(DateRangePickerCustomPickersDay, Object.assign({}, pickersDayProps, { disableMargin: true, between: between ? 1 : 0, first: firstDay ? 1 : 0, last: lastDay ? 1 : 0, selected: firstDay || lastDay })));
    };
    return (_jsx(LocalizationProvider, Object.assign({ dateAdapter: AdapterDayjs }, { children: _jsxs("div", Object.assign({ style: {
                display: 'flex',
                width: '250px',
                flexDirection: 'column',
            } }, { children: [_jsx(TextField, { size: size, value: textFieldValue, InputProps: {
                        endAdornment: EventIcon ? (_jsx(IconButton, Object.assign({ sx: {
                                '&:hover': {
                                    backgroundColor: 'lightgray',
                                    borderRadius: '50%',
                                },
                            }, onClick: () => setOpen(true) }, { children: _jsx(EventIcon, {}) }))) : null,
                    } }), open ? (_jsx(MuiDatePick, Object.assign({ ref: modalRef }, { children: _jsx(StaticDatePicker, { renderDay: renderSelectedDays, minDate: viewChangeState || endDateState ? undefined : startDateState || undefined, displayStaticWrapperAs: "desktop", showDaysOutsideCurrentMonth: true, value: endDateState || startDateState, onViewChange: (currentView) => {
                            if (currentView === 'day') {
                                setViewChangeState(true);
                            }
                            if (lastSelectedDate === 'start') {
                                setEndDateState(null);
                                setLastSelectedDate('start');
                            }
                            else if (lastSelectedDate === 'end') {
                                setLastSelectedDate('end');
                                setStartDateState(null);
                            }
                        }, onChange: (newDate) => {
                            setViewChangeState(true);
                            const newDateValue = newDate ? new Date(newDate) : null;
                            if (!lastSelectedDate || lastSelectedDate === 'end') {
                                setEndDateState(null);
                                setStartDateState(newDateValue);
                                setLastSelectedDate('start');
                                setViewChangeState(false);
                            }
                            else {
                                setEndDateState(newDateValue);
                                setLastSelectedDate('end');
                            }
                        }, renderInput: (params) => _jsx(TextField, Object.assign({}, params)) }) }))) : null] })) })));
};