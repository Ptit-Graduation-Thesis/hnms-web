import React, { useMemo, useState } from 'react'

import { Line, LineConfig, Datum } from '@ant-design/charts'
import { DatePicker, Spin, Tabs } from 'antd'
import dayjs from 'dayjs'

import { useMonthStatistic } from '@/data/useMonthStatistic'
import { useYearStatistic } from '@/data/useYearStatistic'
import styles from '@/styles/dashboard.module.scss'
import { formatDate } from '@/utils/date'
import { formatMoney } from '@/utils/format-number'

const data = [
  {
    month: '1',
    value: 0,
  },
  {
    month: '2',
    value: 0,
  },
  {
    month: '3',
    value: 0,
  },
  {
    month: '4',
    value: 0,
  },
  {
    month: '5',
    value: 0,
  },
  {
    month: '6',
    value: 0,
  },
  {
    month: '7',
    value: 0,
  },
  {
    month: '8',
    value: 0,
  },
  {
    month: '9',
    value: 0,
  },
  {
    month: '10',
    value: 1040689000,
  },
  {
    month: '11',
    value: 140689000,
  },
  {
    month: '12',
    value: 281378000,
  },
]

const config: LineConfig = {
  data,
  yField: 'value',
  padding: 'auto',
  yAxis: {
    label: {
      formatter: (text: string) => formatMoney(text),
    },
  },
  label: {
    formatter: (datum: Datum) => formatMoney(datum.value),
  },
  point: {
    size: 5,
    shape: 'diamond',
    style: {
      fill: 'white',
      stroke: '#5B8FF9',
      lineWidth: 2,
    },
  },
  tooltip: {
    showMarkers: false,
    formatter: (datum: Datum) => ({ title: `Month: ${datum.month}`, name: 'value', value: formatMoney(datum.value) }),
  },
}

const Dashboard = () => {
  const [year, setYear] = useState(formatDate(new Date()))
  const [month, setMonth] = useState(formatDate(new Date()))

  const { data: yearStatistic, isLoading: yearLoading } = useYearStatistic(year)
  const { data: monthStatistic, isLoading: monthLoading } = useMonthStatistic(month)

  const yearConfig = useMemo(() => ({
    ...config,
    data: yearStatistic || [],
    xField: 'month',
    xAxis: {
      title: { text: 'Month' },
    },
  }), [yearStatistic])

  const monthConfig = useMemo(() => ({
    ...config,
    data: monthStatistic || [],
    xField: 'day',
    xAxis: {
      title: { text: 'Day' },
    },
  }), [monthStatistic])

  return (
    <Tabs defaultActiveKey="1" className="h-100">
      <Tabs.TabPane tab="Year" key="1">
        <div className={styles.tab_content}>
          <div className="mb-3 flex justify-end">
            <DatePicker
              picker="year"
              value={dayjs(year) as any}
              onChange={(_, value: string) => setYear(formatDate(value))}
            />
          </div>
          {yearLoading ? <Spin size="large" /> : (
            <div className={styles.chart}>
              <Line {...yearConfig} />
            </div>
          )}
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Month" key="2">
        <div className={styles.tab_content}>
          <div className="mb-3 flex justify-end">
            <DatePicker
              picker="month"
              value={dayjs(month) as any}
              onChange={(_, value: string) => setMonth(formatDate(value))}
            />
          </div>
          {monthLoading ? <Spin size="large" /> : (
            <div className={styles.chart}>
              <Line {...monthConfig} />
            </div>
          )}
        </div>
      </Tabs.TabPane>
    </Tabs>
  )
}

export default Dashboard
