## TableTreeModal 使用方式

```
<TableTreeModal
    model={'screen'}
    selectType={selectedRow.area === 'elec' ? SelectTypeEnum.Device : SelectTypeEnum.Collect}
    title={selectedRow.area === 'elec' ? '选择设备' : '选择设备采集点'}
    open={openTableSelect}
    onCancel={setLeft}
    treeProps={{
        fieldNames: {
            title: 'deviceName',
            key: 'id',
            children: 'children',
        },
        request: requestTree,
    }}
    proTableProps={{
        columns: tableSelectColumns,
        request: getDeviceCollection,
    }}
    valueId={valueMap.valueId}
    valueName={valueMap.valueName}
    treeName="deviceName"
    dealTreeData={dealTreeData}
    value={tableTreeValue}
    onChange={onChange}
/>
```
