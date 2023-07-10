import { columns } from './config';
import type { RoleInfo, RoleParam } from '../type';
import { createRole, getRole, updateRole } from '../service';
import { FormUpdate } from '../components/FormUpdate';
import type { FormUpdateBaseProps } from '../components/FormUpdate/type';

export const RoleUpdate = (props: FormUpdateBaseProps) => {
  return (
    <FormUpdate<RoleInfo, RoleParam>
      titleCreate={`新增角色`}
      titleUpdate={`编辑角色`}
      columns={columns}
      onFinishUpdate={updateRole}
      onFinishCreate={createRole}
      request={getRole}
      {...props}
    />
  );
};
