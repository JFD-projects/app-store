import React, { useState, useEffect } from 'react';
import GroupsList from '../components/groupsList';
import ProductsList from '../components/productsList';
import api from '../api';
import Pagination from '../components/pagination';

const Catalog = () => {
  const [groups, setGroups] = useState();
  const [products, setProducts] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const count = products.length;
  const pageSize = 4;

  useEffect(() => {
    api.products.fetchAll().then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    api.groupsObject.fetchAll().then((data) => setGroups(data));
  }, []);

  const handleGroupSelected = (group) => {
    setSelectedGroup(group);
  };

  const handleClearSelect = () => {
    setSelectedGroup();
  };

  const filtredProducts = selectedGroup
    ? products.filter((p) => p.group === selectedGroup)
    : products;

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  };

  return (
    <div className='row d-flex'>
      <div className='col-sm-3'>
        <GroupsList
          items={groups}
          selectedItem={selectedGroup}
          onItemSelected={handleGroupSelected}
          onSelectClear={handleClearSelect}
          onClearItem
        />
      </div>
      <div className='col flex-grow-1 ms-3'>
        <ProductsList items={filtredProducts} />
        <Pagination
          currentPage={currentPage}
          countItem={count}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Catalog;
