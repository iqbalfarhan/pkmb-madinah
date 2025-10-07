import { addressData } from '@/lib/enums';
import { implodeAddress } from '@/lib/utils';
import { Address } from '@/types/student';
import { FC, useState } from 'react';
import FormControl from './form-control';
import SubmitButton from './submit-button';
import { Button } from './ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

type Props = {
  value?: Address;
  onValueChange?: (value: Address) => void;
};

const AddressSelectorDialog: FC<Props> = ({ value, onValueChange }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const [provinsi, setProvinsi] = useState(value?.provinsi);
  const [dusun, setDusun] = useState(value?.dusun);
  const [kabupaten, setKabupaten] = useState(value?.kota);
  const [kecamatan, setKecamatan] = useState(value?.kecamatan);
  const [kelurahan, setKelurahan] = useState(value?.kelurahan);
  const [kodepos, setKodepos] = useState(value?.kodepos);
  const [jalan, setJalan] = useState(value?.jalan);
  const [rt, setRt] = useState(value?.rt);
  const [rw, setRw] = useState(value?.rw);

  const provinsiList = [...new Set(addressData.map((item) => item.provinsi))];
  const kabupatenList = [...new Set(addressData.filter((item) => item.provinsi === provinsi).map((item) => item.kabupaten))];
  const kecamatanList = [...new Set(addressData.filter((item) => item.kabupaten === kabupaten).map((item) => item.kecamatan))];
  const kelurahanList = [...new Set(addressData.filter((item) => item.kecamatan === kecamatan).map((item) => item.kelurahan))];

  const handleKelurahanChange = (value: string) => {
    setKelurahan(value);
    const data = addressData.find((item) => item.kelurahan === value && item.kecamatan === kecamatan);
    if (data) setKodepos(data.kodepos);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        {/* <Textarea value={implodeAddress(value as Address)} onChange={(e) => onValueChange?.(e.target.value)} /> */}
        <Textarea
          value={implodeAddress({
            jalan: jalan?.toString(),
            dusun: dusun?.toString(),
            rt: rt?.toString(),
            rw: rw?.toString(),
            kelurahan: kelurahan?.toString(),
            kodepos: kodepos?.toString(),
            kecamatan: kecamatan?.toString(),
            kota: kabupaten,
            provinsi: provinsi?.toString(),
          } as Address)}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tempat Tinggal</DialogTitle>
          <DialogDescription>Alamat lengkap tempat tinggal</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6 py-4">
          <FormControl label="Provinsi">
            <Select
              value={provinsi}
              onValueChange={(value) => {
                setProvinsi(value);
                setKabupaten('');
                setKecamatan('');
                setKelurahan('');
                setKodepos('');
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih provinsi" />
              </SelectTrigger>
              <SelectContent>
                {provinsiList.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>

          <FormControl label="Kabupaten / Kota">
            <Select
              value={kabupaten}
              onValueChange={(value) => {
                setKabupaten(value);
                setKecamatan('');
                setKelurahan('');
                setKodepos('');
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih kabupaten / kota" />
              </SelectTrigger>
              <SelectContent>
                {kabupatenList.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>

          <FormControl label="Kecamatan">
            <Select
              value={kecamatan}
              onValueChange={(value) => {
                setKecamatan(value);
                setKelurahan('');
                setKodepos('');
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih kecamatan" />
              </SelectTrigger>
              <SelectContent>
                {kecamatanList.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>

          <FormControl label="Kelurahan">
            <Select value={kelurahan} onValueChange={handleKelurahanChange}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kelurahan" />
              </SelectTrigger>
              <SelectContent>
                {kelurahanList.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>

          <FormControl label="Jalan / Perumahan & No. Rumah">
            <Input placeholder="Contoh: Jl. Durian No. 88" value={jalan} onChange={(e) => setJalan(e.target.value)} />
          </FormControl>

          <FormControl label="Dusun">
            <Input placeholder="Nama dusun" value={dusun} onChange={(e) => setDusun(e.target.value)} />
          </FormControl>

          <FormControl label="RT">
            <Input placeholder="Misal: 01" value={rt} onChange={(e) => setRt(e.target.value)} />
          </FormControl>

          <FormControl label="RW">
            <Input placeholder="Misal: 04" value={rw} onChange={(e) => setRw(e.target.value)} />
          </FormControl>

          <FormControl label="Kode Pos">
            <Input placeholder="Kode Pos" value={kodepos} readOnly />
          </FormControl>
        </div>
        <DialogFooter className="flex flex-1 justify-between">
          <DialogClose asChild>
            <Button variant={'secondary'}>Batal</Button>
          </DialogClose>
          <SubmitButton
            onClick={() => {
              const address = implodeAddress(value as Address);
              console.log(address);
              onValueChange?.({
                jalan: jalan?.toString(),
                dusun: dusun?.toString(),
                rt: rt?.toString(),
                rw: rw?.toString(),
                kelurahan: kelurahan?.toString(),
                kodepos: kodepos?.toString(),
                kecamatan: kecamatan?.toString(),
                kota: kabupaten,
                provinsi: provinsi?.toString(),
              } as Address);
              setOpenDialog(false);
            }}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddressSelectorDialog;
