import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Web } from 'sp-pnp-js';
import { ColumnDef } from '@tanstack/react-table';
import GlobalCommanTable from '../../../GlobalCommanTable';
let ParentMetaDataItems: any = [];
let SmartmetadataItems: any = [];
export default function ManageSmartMetadata(selectedProps: any) {
    const [Smartmetadata, setSmartmetadata]: any = useState([]);
    const [Tabs, setTabs] = useState([]);
    var [TabsFilter]: any = useState([]);
    const GetAdminConfig = async () => {
        try {
            let web = new Web(selectedProps.AllList.SPBackupConfigListUrl);
            const Config = await web.lists.getById(selectedProps.AllList.SPBackupConfigListID).items.select("ID,Title,OrderBy,WebpartId,DisplayColumns,Columns,QueryType,FilterItems&$filter=WebpartId eq 'AllManageSmartMetadataPortfolioTabs'").getAll();
            if (Config) {
                setTabs(JSON.parse(Config[0].DisplayColumns));
                console.log(Tabs);
            }
            LoadSmartMetadata();
        } catch (error) {
            console.error(error);
        }
    };
    const LoadSmartMetadata = async () => {
        try {
            let web = new Web(selectedProps.AllList.SPBackupConfigListUrl);
            const AllMetaDataItems = await web.lists.getById('01a34938-8c7e-4ea6-a003-cee649e8c67a').items.select("*,Author/Title,Editor/Title,Parent/Id,Parent/Title&$expand=Parent,Author,Editor&$orderBy=SortOrder&$filter=isDeleted ne 1").getAll();
            ParentMetaDataItems.forEach((item1: any) => {
                AllMetaDataItems.forEach((item2: any) => {
                    if (item1?.Id === item2?.ParentId) {
                        if (item1.subRows === undefined)
                            item1.subRows = [];
                        item1.subRows.push(item2)
                    }
                })
            })
            SmartmetadataItems = SmartmetadataItems.concat(AllMetaDataItems)
            ShowingTabsData('Categories')
        } catch (error) {
            console.error(error);
        }
    };
    const ShowingTabsData = async (Tab: any) => {
        TabsFilter = [];
        ParentMetaDataItems = SmartmetadataItems?.filter((comp: any) => comp?.ParentID === 0);
        ParentMetaDataItems.filter((item: any) => {
            if (item.TaxType && item.TaxType === Tab) {
                TabsFilter.push(item);
            }
        });
        setSmartmetadata(TabsFilter);
    };
    useEffect(() => {
        GetAdminConfig();
    }, [0]);
    const columns = useMemo<ColumnDef<any, unknown>[]>(() => [
        {
            accessorKey: 'Title',
            placeholder: 'Title',
            header: '',
            size: 10,
            cell: ({ row }) => (
                <>
                    <div className='alignCenter'>
                        {row?.original?.Title != undefined &&
                            row?.original?.Title != null &&
                            row?.original?.Title != '' ? (
                            <a className='ms-2'>{row?.original?.Title}</a>
                        ) : null}
                    </div>
                </>
            ),
        },
        {
            accessorKey: 'TaxType',
            placeholder: 'TaxType',
            header: '',
            size: 10,
            cell: ({ row }) => (
                <>
                    <div className='alignCenter'>
                        {row?.original?.TaxType != undefined &&
                            row?.original?.TaxType != null &&
                            row?.original?.TaxType != '' ? (
                            <a className='ms-2'>{row?.original?.TaxType}</a>
                        ) : null}
                    </div>
                </>
            ),
        },
        {
            accessorKey: 'SortOrder',
            placeholder: 'SortOrder',
            header: '',
            size: 10,
            cell: ({ row }) => (
                <>
                    <div className='alignCenter'>
                        {row?.original?.SortOrder != undefined &&
                            row?.original?.SortOrder != null &&
                            row?.original?.SortOrder != '' ? (
                            <a className='ms-2'>{row?.original?.SortOrder}</a>
                        ) : null}
                    </div>
                </>
            ),
        },
    ],
        [Smartmetadata]);

    const callBackData = useCallback((elem, getSelectedRowModel, ShowingData) => {
        // Your callback logic here
    }, []);

    return (
        <>
            <ul className="nav nav-tabs" role="tablist">
                {Tabs.map((item: any, index: any) => (
                    <button className={
                        index === 0
                            ? "nav-link active"
                            : "nav-link"
                    } onClick={() => ShowingTabsData(item.Title)} key={index} data-bs-toggle="tab" data-bs-target="#URLTasks" type="button" role="tab" aria-controls="URLTasks" aria-selected="true">
                        {item.Title}
                    </button>
                ))}
            </ul>
            <div className="border border-top-0 clearfix p-2 tab-content " id="myTabContent">
                <div className="tab-pane Alltable mx-height show active" id="URLTasks" role="tabpanel" aria-labelledby="URLTasks">
                    {
                        Smartmetadata &&
                        <GlobalCommanTable columns={columns} data={Smartmetadata} showHeader={true} callBackData={callBackData} />
                    }
                </div>
            </div>
        </>
    );
}
