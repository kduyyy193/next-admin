'use client';
import { useEffect, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import styles from './pagination.module.css';

interface PaginationProps {
  count: number;
}

const Pagination: React.FC<PaginationProps> = ({ count }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = parseInt(searchParams.get('page') || '1', 10);

  const params = useMemo(() => new URLSearchParams(searchParams), [searchParams]);
  const ITEM_PER_PAGE = 2;

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

  const handleChangePage = (type: 'prev' | 'next') => {
    const newPage = type === 'prev' ? page - 1 : page + 1;
    params.set('page', newPage.toString());
    replace(`${pathname}?${params}`);
  };

  useEffect(() => {
    if (count <= ITEM_PER_PAGE * (page - 1)) {
      const newPage = Math.ceil(count / ITEM_PER_PAGE);
      params.set('page', newPage.toString());
      replace(`${pathname}?${params}`);
    }
  }, [count, page, params, pathname, replace]);

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handleChangePage('prev')}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => handleChangePage('next')}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;