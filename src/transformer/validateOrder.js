let ValidateOrderTransformer = {
    transform: (items) => {
        return ValidateOrderTransformer._transformItems(items);
    },
    _transformItems: (items) => {
        if (Array.isArray(items)) {
            let output = [];
            items.forEach((item) => {
                output.push(ValidateOrderTransformer._transformItemData(item));
            });
            return output;
        }
        else {
            return ValidateOrderTransformer._transformItemData(items);
        }
    },
    _transformItemData: (item) => {
        if (!item) { return {}; }
        const obj = {};
        return Object.assign({}, {
            "material_code": item.code,
            "item_number": item.item_number,
            "required_qty": item.quantity,
            "target_qty": item.quantity,
            "pack_type": item.pak_type,
            "sales_unit": item.sales_unit,
            "description": item.description
        }, obj);
    }
}

export default ValidateOrderTransformer;

