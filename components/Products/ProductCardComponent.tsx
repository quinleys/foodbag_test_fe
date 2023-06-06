import Image from "next/image";
import mainStyles from "../../styles/main.module.scss";
import styles from "../../styles/product_card.module.scss";
import BadgeComponent from "@/components/UI/BadgeComponent";
import {ReactElement} from "react";
import {Allergy, Product, ProductCategory} from "@/interfaces/products";

export default function ProductCardComponent({product, handleCardClick}: {
    product: Product,
    handleCardClick: (Product) => void
}): ReactElement {
    return (
        <article className={mainStyles.card} onClick={() => handleCardClick(product)}>
            {product.images && (
                <div style={{width: '100%', height: 200, position: "relative"}}>
                    <Image src={product.images[0].url} alt={product.name} fill={true}
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                           className={styles.card__image}/>
                </div>
            )}
            <h2 className={styles.title}>{product.name}</h2>
            <p className={styles.subtitle}>{product.subtitle}</p>
            {product.categories && (
                <div className={mainStyles.row}>
                    {product.categories.map((category: ProductCategory, key: number) => (
                        <BadgeComponent key={key} title={category.name} className={styles.badge}/>
                    ))}
                </div>
            )}
            {product.allergies && (
                <div className={mainStyles.row}>
                    {product.allergies.map((allergy: Allergy, key: number) => (
                        <BadgeComponent key={key} title={allergy.name} className={styles.badge__secondary}/>
                    ))}
                </div>
            )}
        </article>
    )
}