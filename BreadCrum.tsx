import React, { useEffect, useState } from 'react';
import { Web } from 'sp-pnp-js';
var allTopNavigationItems: any = [];
export default function BraedCrum(props: any) {
    const [breadcrum, setBreadcrum]: any = useState([]);
    const loadTopNavigation = async () => {
        try {
            let web = new Web(props?.AllList?.SPSitesListUrl);
            allTopNavigationItems = await web.lists.getById(props.AllList.SPTopNavigationListID).items.getAll();
            showingBreadcrumb();
            console.log(breadcrum)
        } catch (error: any) {
            console.error(error);
        }
    };
    const showingBreadcrumb = () => {
        var breadCrumbItems: any = [];
        var breadCrumbItems1: any = [];
        var breadCrumbItems3: any = [];
        var allBreadCrum: any = [];
        if (allTopNavigationItems?.length > 0) {
            allTopNavigationItems?.forEach((top: any) => {
                if (top?.Title === "Manage Smartmetadata") {
                    breadCrumbItems.push(top)
                    allBreadCrum.push(top)
                }
            })
            if (breadCrumbItems) {
                allTopNavigationItems.filter((topnav: any) => {
                    if (topnav?.Id === breadCrumbItems[0]?.ParentID) {
                        breadCrumbItems1.push(topnav)
                        allBreadCrum.push(topnav)
                    }
                })
            }
            if (breadCrumbItems1) {
                allTopNavigationItems?.forEach((topnavi: any) => {
                    if (topnavi?.Id === breadCrumbItems1[0]?.ParentID) {
                        breadCrumbItems3.push(topnavi)
                        allBreadCrum.push(topnavi)
                    }
                })
            }
            setBreadcrum(allBreadCrum);
        }
    }
    useEffect(() => {
        loadTopNavigation();
    }, []);

    return (
        <>
            <div className="row">
                <div className="col-sm-12 p-0 ">
                    <ul className="spfxbreadcrumb m-0 p-0">
                        {
                            breadcrum.reverse()?.map((item: any) => {
                                return (<>
                                    <li>
                                        <a target="_blank" data-interception="off" href="https://hhhhteams.sharepoint.com/sites/HHHH/SP/SitePages/Team-Portfolio.aspx">{item?.Title}</a>
                                    </li>
                                </>)
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}

