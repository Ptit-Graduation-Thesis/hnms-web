import React, { useState } from 'react'
import { Button, Modal } from 'antd'

import eyeIcon from '@/assets/img/eye.svg'
import closeIson from '@/assets/img/close-icon.svg'
import { DetailItem } from '@/types/item.type'
import styles from '@/styles/item.module.scss'
import { formatMoney } from '@/utils/format-number'

interface ModalDetailItemProps {
  item: DetailItem
}

const ModalDetailItem: React.FC<ModalDetailItemProps> = ({ item }) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Modal footer={null} closable={false} visible={visible}>
        <Button
          className={styles.close_icon}
          type="text"
          icon={<img src={closeIson} alt="" />}
          onClick={() => setVisible(false)}
        />
        <h2>Detail item</h2>
        <div className={styles.item_info}>
          <img src={item.pictureUrl} alt="" />
          <div className={styles.item_name}>
            <span>{item.name}</span>
            <span>{item.qrCode}</span>
            <span>{formatMoney(item.price)}</span>
          </div>
        </div>
        <span className={styles.item_des}>{item.des}</span>
        <h3 className="mt-3 bold">In stock address</h3>
        {item.branchItems.map((branchItem) => (
          <div key={branchItem.id} className={`${styles.branch_item}`}>
            <span className="bold">{branchItem.branch.name}</span>
            <span>{branchItem.branch.address}</span>
            <span>Amount: {branchItem.amount}</span>
          </div>
        ))}
      </Modal>
      <Button
        className="table-icon mr-3"
        type="text"
        icon={<img src={eyeIcon} alt="" />}
        onClick={() => setVisible(true)}
      />
    </>
  )
}

export default ModalDetailItem
