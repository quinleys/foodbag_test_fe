import badgeStyles from "@/styles/badge.module.scss";
import styles from '../../styles/product_modal.module.scss'
import mainStyles from "@/styles/main.module.scss";
import BadgeComponent from "@/components/UI/BadgeComponent";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faXmark} from '@fortawesome/free-solid-svg-icons';
import {ReactElement} from "react";
import {Product} from "@/interfaces/products";

export default function ProductModalComponent({
                                                  product,
                                                  visible,
                                                  nextProduct,
                                                  prevProduct,
                                                  handleVisibility,
                                                  handleModalClick
                                              }: {
    product: Product,
    visible: boolean,
    nextProduct: Product,
    prevProduct: Product,
    handleVisibility: () => void,
    handleModalClick: (product: Product) => void
}): ReactElement {
    return (
        <div className={visible ? styles.modal__visible : styles.modal__hidden}>
            <div className={styles.modal__visible__card}>
                {prevProduct && (
                    <div className={styles.modal__visible__card__prev} onClick={() => handleModalClick(prevProduct)}>
                        <div className={styles.modal__visible__card__icon}>
                            <FontAwesomeIcon icon={faAngleLeft}/>
                        </div>
                    </div>
                )}
                <div className={styles.modal__visible__card__close} onClick={handleVisibility}>
                    <div className={styles.modal__visible__card__icon}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </div>
                </div>
                {nextProduct && (
                    <div className={styles.modal__visible__card__next} onClick={() => handleModalClick(nextProduct)}>
                        <div className={styles.modal__visible__card__icon}>
                            <FontAwesomeIcon icon={faAngleRight}/>
                        </div>
                    </div>
                )}
                <div className={styles.modal__visible__card__container}>
                    <div className={styles.modal__visible__card__header}>
                        <Image src={product.images[0].url} alt={product.name} fill={true}
                               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                               style={{
                                   objectFit: "cover"
                               }}
                        />
                    </div>
                    <div className={styles.modal__visible__card__body}>
                        <h1>{product.name}</h1>
                        <h4>{product.subtitle}</h4>
                        <p>{product.description}</p>
                        <div className={mainStyles.row}>
                            <div className={styles.modal__visible__card__body__categories}>
                                {product.categories.map((category, index) => (
                                    <BadgeComponent title={category.name} key={category.external_id}/>
                                ))}
                            </div>
                            <div className={styles.modal__visible__card__body__categories}>
                                {product.allergies.map((allergy, index) => (
                                    <BadgeComponent title={allergy.name} className={badgeStyles.badge__secondary}
                                                    key={allergy.external_id}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.modal__visible} onClick={handleVisibility}/>
        </div>
    )
}