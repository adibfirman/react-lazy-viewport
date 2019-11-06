type AbcType<T> = {
  result: T;
  status: 0 | 1;
};

function initMyFunc<T>(asyncComp: () => Promise<{ default: T }>): AbcType<T> {
  const callComp = asyncComp();

  abc.status = 0;
  callComp.then(objectData => {
    abc.status = 1;
    abc.result = "dsadasdsadsa";
  });

  return abc;
}

const loadComp = initMyFunc(() => import("./Test"));

console.log(loadComp);
